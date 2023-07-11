import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/prisma/client"
import { User } from "@prisma/client"
import { getServerSession } from "next-auth/next"
import { notFound } from "next/navigation"
import ReviewFeed from "../ReviewFeed"

export default async function CustomFeed() {
  const session = await getServerSession(authOptions)

  if (!session) return notFound()

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

  const customInitReviews = await prisma.review.findMany({
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
      comments: {
        include: {
          user: true
        }
      },
      likes: true
    },
    take: 5,
  })

  if (customInitReviews.length < 2) {
    const initialReviews = await prisma.review.findMany({
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
        comments: {
          include: {
            user: true
          }
        },
        likes: true
      },
      take: 5
    })
    return <ReviewFeed initialReviews={initialReviews}/>
  } else {
    return <ReviewFeed initialReviews={customInitReviews}/>
  }
}