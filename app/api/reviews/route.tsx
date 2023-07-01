import { getServerSession } from "next-auth/next"
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route"
import prisma from "@/prisma/client"
import { FullReview } from "@/app/types"
import { User } from "@prisma/client"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const cursor = searchParams.get("cursor")
  const session = await getServerSession(authOptions)

  if (!cursor) {
    return NextResponse.json({ error: "Invalid request" })
  } else {
    if (session) {
      const followers = prisma.user.findMany({
        where: {
          follows: {
            some: {
              id: session.user.id
            }
          }
        }
      })

      const followerIds = (await followers).map((follower: User) => {
        return follower.id
      })

      const customReviews = await prisma.review.findMany({
        orderBy: [
          {
            createdAt: 'desc'
          },
          {
            likes: {
              _count: 'desc'
            }
          }
        ],
        where: {
          userId: {
            in: followerIds
          }
        },
        include: {
          user: true,
          comments: true,
          likes: true
        },
        take: 3,
        skip: (parseInt(cursor) - 1) * 3
      })

      if (customReviews.length < 3) {
        const reviews = await prisma.review.findMany({
          orderBy: [
            {
              createdAt: 'desc'
            },
            {
              likes: {
                _count: 'desc'
              }
            }
          ],
          include: {
            user: true,
            comments: true,
            likes: true
          },
          take: 3,
          skip: (parseInt(cursor) - 1) * 3
        })
        return NextResponse.json(reviews)
      } else {
        return NextResponse.json(customReviews)
      }
    } else {
      const reviews = await prisma.review.findMany({
        orderBy: [
          {
            createdAt: 'desc'
          },
          {
            likes: {
              _count: 'desc'
            }
          }
        ],
        include: {
          user: true,
          comments: true,
          likes: true
        },
        take: 3,
        skip: (parseInt(cursor) - 1) * 3
      })
      return NextResponse.json(reviews)
    }
  }
}