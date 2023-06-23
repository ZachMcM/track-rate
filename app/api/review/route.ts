import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  const body = await request.json()
  const { itemId, rating, type, content, title } = body
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
          itemId: itemId,
          title: title
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
      }
    }))
    return NextResponse.json(review)
  } else {
    return NextResponse.json({error: "Invalid request, no id"}, {status: 400})
  }
}