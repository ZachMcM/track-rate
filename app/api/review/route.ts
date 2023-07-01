import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  const body = await request.json()
  const { itemId, itemName, rating, type, content, favTrackName, favTrackId } = body
  if (session && session.user) {
    if (session.user) {
      const newReview = await prisma.review.create({
        data: {
          userId: session.user.id,
          content: content,
          rating: rating,
          type: type,
          itemId: itemId,
          itemName: itemName,
          favoriteTrackName: favTrackName,
          favoriteTrackId: favTrackId
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