import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { revalidateTag } from "next/cache";

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions)
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")
  if (session.user && userId) {

    const existingFollow = await prisma.user.findFirst({
      where: {
        id: userId,
        followers: { some: { id: session.user.id } }
      }
    })  

    if (existingFollow == null) {
      const newFollower = await prisma.user.update({
        where: {
          id: userId
        },
        data: { 
          followers: { connect: { id: session.user.id } } 
        }
      })
      await prisma.activity.createMany({
        data: [
          // activity for the person that followed
          {
            userId: session.user.id,
            activityType: "gave follow",
            otherUserId: userId,
          },
          // activity for the person whose review was liked
          {
            userId: userId,
            activityType: "recieved follow",
            otherUserId: session.user.id
          }
        ]
      })
      revalidateTag(`user${userId}`)
      revalidateTag(`user${session.user.id}`)
    } else {
      const unFollower = await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          followers: { disconnect: { id: session.user.id } }
        }
      }) 
    }
  } else {
    return NextResponse.json({error: "Invalid Request" }, { status: 400 })
  }
}