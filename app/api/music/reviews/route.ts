import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const type = searchParams.get("type") as "artist" | "album" | "track"

  if (type && id) {
      const whereClause = type == "album" ? { albumId: id } : type == "track" ? { trackId: id } : { artistIds: {
      has: id
      }}

      const relatedReviews = await prisma.review.findMany({
        where: whereClause,
        take: 10,
        orderBy: [
          {
            createdAt: "desc"
          },
          {
            likes: {
              _count: "desc"
            }
          }
        ],
        include: {
          comments: {
            include: {
              user: true
            }
          },
          user: true,
          likes: true
        }
      })

      return NextResponse.json(relatedReviews)
    
  } else {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}