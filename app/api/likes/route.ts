import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"

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
        return NextResponse.json(deletedLike)
      } else {
        const newLike = await prisma.like.create({
          data: {
            userId: data.userId,
            reviewId: data.reviewId
          }
        })
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
      },
      include: {
        review: {
          include: {
            likes: true,
            comments: true,
            user: true
          }
        }
      }
    }))
    return NextResponse.json(likes)
  } else {
    return NextResponse.json({error: "Invalid request, no id"}, {status: 400})
  }
}