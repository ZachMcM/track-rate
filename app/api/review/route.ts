import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  const body = await request.json()
  const { item, rating, type, content, title, favTrack } = body
  if (session && session.user && session.user.email) {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email
      }
    })
    if (user) {
      const newReview = await prisma.review.create({
        data: {
          userId: user.id,
          content: content,
          rating: rating,
          type: type,
          item: item,
          title: title,
          favoriteTrack: favTrack
        }
      })
      await prisma.activity.create({
        data: {
          userId: user.id,
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