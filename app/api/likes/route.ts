import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { revalidateTag } from "next/cache";

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions)
  const { searchParams } = new URL(request.url)
  const reviewId = searchParams.get("reviewId")
  if (session.user && reviewId) {
    const review = await prisma.review.findUnique({
      where: {
        id: reviewId
      }
    })
    if (review) {
      const data = { userId: session.user.id, reviewId: reviewId}

      const like = await prisma.like.findUnique({
        where: {
          userId_reviewId: data
        }
      })

      if (like) {
        const deletedLike = await prisma.like.delete({
          where: {
            userId_reviewId: data
          }
        })
        revalidateTag(review.userId)
        revalidateTag(data.userId)
        revalidateTag(data.reviewId)
        return NextResponse.json(deletedLike)
      } else {
        const newLike = await prisma.like.create({
          data: {
            userId: data.userId,
            reviewId: data.reviewId
          }
        })
        await prisma.activity.createMany({
          data: [
            // activity for the person that liked
            {
              userId: data.userId,
              itemId: reviewId,
              itemType: "review",
              activityType: "gave like",
              otherUserId: review?.userId,
            },
            // activity for the person whose review was liked
            {
              userId: review.userId,
              itemId: reviewId,
              itemType: "review",
              activityType: "recieved like",
              otherUserId: data.userId
            }
          ]
        })
        revalidateTag(review.userId)
        revalidateTag(data.userId)
        revalidateTag(data.reviewId)
        return NextResponse.json(newLike)
      }
    } else {
      return NextResponse.json({error: "Invalid Request" }, { status: 400 })
    }
  } else {
    return NextResponse.json({error: "Invalid Request" }, { status: 400 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const reviewId = searchParams.get("reviewId")
  if (reviewId) {
    const likes = await prisma.like.findMany(({
      where: {
        reviewId: reviewId
      }
    }))
    return NextResponse.json(likes)
  } else {
    return NextResponse.json({error: "Invalid request, no id"}, {status: 400})
  }
}