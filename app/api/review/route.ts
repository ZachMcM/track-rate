import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { NewReviewParams } from "@/app/types";
import { Session } from "next-auth";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  const body = await request.json()
  const { 
    trackName,
    trackId,
  
    artistNames,
    artistIds,
    artistImages,
  
    albumName,
    albumId,
    albumImage,
    
    rating,
    type,
    content,
    pinned,
  } = body as NewReviewParams

  if (session && session.user) {
    if (session.user) {
      console.log(body)

      const newReview = await prisma.review.create({
        data: {
          userId: session.user.id,
          content: content,
          rating: rating,
          type: type,
          pinned: pinned,
          
          trackName: trackName,
          trackId: trackId,

          artistNames: artistNames,
          artistIds: artistIds,
          artistImages: artistImages,

          albumName: albumName,
          albumId: albumId,
          albumImage: albumImage,
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

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id  = searchParams.get("id")
  const session = await getServerSession(authOptions) as Session

  if (!session) return NextResponse.json({ error: "Unauthorized request", status: 401 })

  if (id) {
    const deletedReview = await prisma.review.delete({
      where: {
        userId: session.user.id,
        id: id
      }
    })
    return NextResponse.json(deletedReview)
  } else {
    return NextResponse.json({ error: "Invalid request, no id"}, { status: 400 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const session = await getServerSession(authOptions) as Session

  if (!session) return NextResponse.json({ error: "Unauthorized request", status: 401 })

  if (id) {
    const review = await prisma.review.findUnique(({
      where: {
        id: id,
      },
      include: {
        user: true,
        likes: true,
        comments: {
          include: {
            user: true
          }
        }
      }
    }))
    return NextResponse.json(review)
  } else {
    return NextResponse.json({error: "Invalid request, no id"}, {status: 400})
  }
}