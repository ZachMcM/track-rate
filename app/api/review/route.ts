import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  const body = await request.json()
  const { itemId, itemName, rating, type, content, title, favTrackName, favTrackId } = body
  if (session && session.user) {
    if (session.user) {
      revalidateTag(session.user.id)
      const newReview = await prisma.review.create({
        data: {
          userId: session.user.id,
          content: content,
          rating: rating,
          type: type,
          itemId: itemId,
          itemName: itemName,
          title: title,
          favoriteTrackName: favTrackName,
          favoriteTrackId: favTrackId
        }
      })
      await prisma.activity.create({
        data: {
          userId: session.user.id,
          itemId: newReview.id,
          itemType: "review",
          activityType: "created review"
        }
      })
      return NextResponse.json(newReview)
    } else {
      return NextResponse.json({error: "Invalid Request" }, { status: 400 })
    }
  } else {
    return NextResponse.json({error: "Invalid Request" }, { status: 400 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  if (id) {
    const review = await prisma.review.findUnique(({
      where: {
        id: id
      },
      include: {
        user: true,
        likes: true,
        comments: true
      }
    }))
    return NextResponse.json(review)
  } else {
    return NextResponse.json({error: "Invalid request, no id"}, {status: 400})
  }
}