import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  const { searchParams } = new URL(request.url)
  const reviewId = searchParams.get("reviewId")
  const content = searchParams.get("content")

  if (session.user && reviewId && content) {
    const review = await prisma.review.findUnique({
      where: {
        id: reviewId
      }
    })

    const newComment = await prisma.reviewComment.create({
      data: {
        userId: session.user.id,
        content: content,
        reviewId: reviewId
      }
    })

    await prisma.activity.createMany({
      data: [
        // activity for the person that liked
        {
          userId: session.user.id,
          itemId: reviewId,
          itemType: "review",
          activityType: "gave comment",
          otherUserId: review?.userId,
        },
        // activity for the person whose review was liked
        {
          // @ts-expect-error
          userId: review?.userId,
          itemId: reviewId,
          itemType: "review",
          activityType: "recieved comment",
          otherUserId: session.user.id
        }
      ]
    })
    revalidateTag(`user${review?.userId}`)
    revalidateTag(`user${session.user.id}`)
    return NextResponse.json(newComment)
  } else {
    return NextResponse.json({error: "Invalid Request" }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions)
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (session.user && id) {
    const comment = await prisma.reviewComment.findUnique({
      where: {
        id: id
      }
    })
    if (comment?.userId == session.user.id) {
      const deletedComment = await prisma.reviewComment.delete({
        where: {
          id: id
        }
      })
      return NextResponse.json(deletedComment)
    } else {
      return NextResponse.json({error: "Invalid Request, unauthorized delete" }, { status: 400 })
    }
  } else {
    return NextResponse.json({error: "Invalid Request" }, { status: 400 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const reviewId = searchParams.get("reviewId")
  if (reviewId) {
    const comments = await prisma.reviewComment.findMany({
      where: {
        reviewId: reviewId
      },
      include: {
        user: true
      }
    })
    return NextResponse.json(comments)
  } else {
    return NextResponse.json({error: "Invalid request, no id"}, {status: 400})
  }
}