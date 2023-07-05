import ReviewFeed from "./ReviewFeed"
import prisma from "@/prisma/client"

export default async function GeneralFeed() {
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
    take: 2
  })

  return <ReviewFeed initialReviews={initialReviews}/>
}