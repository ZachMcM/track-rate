import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const type = searchParams.get("type") as "artist" | "album" | "track"
  const session = await getServerSession(authOptions)

  if (type && id) {
      const whereClause = type == "album" ? { albumId: id } : type == "track" ? { trackId: id } : { artistIds: {
        has: id
      } }

      const involvedReviews = await prisma.review.aggregate({
        where: whereClause,
        _avg: {
          rating: true
        },
        _count: true
      })

      let yourRating

      if (session) {
        const idWhereClause = type == "album" ? { albumId: id, userId: session.user.id } : type == "track" ? { trackId: id, userId: session.user.id  } : { artistIds: {
          has: id
        }, userId: session.user.id }

        const usersReview = await prisma.review.findFirst({
          where: idWhereClause,
          select: {
            rating: true
          }
        })

        if (usersReview) {
          yourRating = usersReview.rating
        }
      }

      return NextResponse.json({
        involvedReviews,
        yourRating: yourRating
      })      
  } else {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}