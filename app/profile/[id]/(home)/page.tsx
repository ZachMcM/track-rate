'use client'

import SmallReview from "@/components/review/SmallReviewCard"
import ReviewCard from "@/components/review/ReviewCard"
import { TbChevronRight } from "react-icons/tb"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { getUserReviews } from "@/app/apiMethods"
import LoadingSpinner from "@/components/LoadingSpinner"
import { ExtendedReview } from "@/app/types"

export default function Profile({ params }: { params: { id: string } }) {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user-reviews', { id: params.id }],
    queryFn: () => getUserReviews(params.id)
  })

  if (user && !isLoading) {
    const pinnedReviews = user.reviews.filter((review: ExtendedReview) => {
      return review.pinned
    })
  
    return (
      <div className="flex space-x-10 items-start">
        <div className="flex flex-col space-y-8 md:basis-3/4">   
          <div className="flex flex-col space-y-3">
            <Link href={`/profile/${user.id}/activity`} className="flex items-center justify-between hover:opacity-70 duration-300">
              <p className="font-medium text-lg">Recent activity</p>
              <TbChevronRight className="text-xl"/>
            </Link>
            {
              user.reviews.length != 0 ?
              <div className="flex justify-around md:space-x-10 p-5 dark:bg-zinc-900 bg-white rounded-lg drop-shadow-md">
                {
                  user.reviews.slice(0, 3)
                  .map((review: ExtendedReview) => {
                    return <SmallReview key={review.id} review={review}/>
                  })
                }
              </div> :
              <div className="flex px-5 py-10 bg-white rounded-lg drop-shadow-md dark:bg-zinc-900 justify-center items-center basis-2/3">
                <p className="text-zinc-500 text-sm">No content</p>
              </div>
            }
          </div>
          <div className="flex flex-col space-y-3">
          <Link href={`/profile/${user.id}/pinned`} className="flex items-center justify-between hover:opacity-70 duration-300">
              <p className="font-medium text-lg">Pinned</p>
              <TbChevronRight className="text-xl"/>
            </Link>
            {
              pinnedReviews.length != 0 ?
              <>
                {
                  <div className="flex flex-col rounded-lg drop-shadow-md dark:bg-zinc-900 bg-white">
                    {
                      pinnedReviews.map((review: ExtendedReview) => {
                        return <ReviewCard key={review.id} review={review}/>
                      })
                    }
                  </div>
                }
              </> :
              <div className="flex px-5 py-10 bg-white rounded-lg drop-shadow-md dark:bg-zinc-900 justify-center items-center basis-2/3">
                <p className="text-zinc-500 text-sm">No pinned reviews</p>
              </div>
            }
          </div>        
        </div>
      </div> 
    )
  } else {
    return <LoadingSpinner/>
  }
}

