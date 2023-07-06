'use client'

import ReviewCard from "@/components/review/ReviewCard";
import { useQuery } from "@tanstack/react-query";
import { getUserReviews } from "@/app/apiMethods";
import { ExtendedReview } from "@/app/types";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Pinned({ params }: { params: { id: string } }) {
  const { data: user, isLoading } = useQuery({
    queryFn: () => getUserReviews(params.id),
    queryKey: ['user-reviews', { id: params.id }]
  })

  if (user && !isLoading) {
    const pinnedReviews = user?.reviews.filter((review: ExtendedReview) => {
      return review.pinned
    })  

    return (
      <div className="flex flex-col space-y-3">
        <p className="font-medium text-lg">Pinned</p>
        {
          pinnedReviews.length != 0 ?
          <>
            {
              <div className="flex flex-col rounded-lg drop-shadow-md dark:bg-zinc-900 bg-white">
                {
                  pinnedReviews.map((review: ExtendedReview) => {
                    return <ReviewCard review={review}/>
                  })
                }
              </div>
            }
          </> :
          <div className="flex px-5 py-10 bg-white rounded-lg drop-shadow-md dark:bg-zinc-900 justify-center items-center basis-2/3">
            <p className="text-zinc-500 text-sm">No pinned</p>
          </div>
        }
      </div> 
    )
  } else {
    return <LoadingSpinner/>
  }
}