'use client'

import { useQuery } from "@tanstack/react-query"
import LoadingSpinner from "../LoadingSpinner"
import { ExtendedReview } from "@/app/types"
import ReviewCard from "../review/ReviewCard"

export default function MusicReviews({ id, type }: { id: string, type: string }) {
  const { data: relatedReviews, isLoading } = useQuery({
    queryKey: ['music-reviews', { id: id }],
    queryFn: async (): Promise<ExtendedReview[]> => {
      const res = await fetch(`/api/music/reviews?id=${id}&type=${type}`)
      const data = await res.json()
      console.log(data)
      return data
    }
  })

  if (relatedReviews && !isLoading) {
    return (
      <>
      {
        relatedReviews.length != 0 ?
        <div className="flex flex-col dark:bg-zinc-900 bg-white drop-shadow-md rounded-lg">
          {
            relatedReviews.map((review: ExtendedReview) => {
              return <ReviewCard review={review}/>
            })
          }
        </div> :
        <div className="flex px-5 py-10 bg-white dark:bg-zinc-900 rounded-lg drop-shadow-md justify-center items-center basis-2/3">
          <p className="text-zinc-500 text-sm">No reviews</p>
        </div>
      }
      </>

    )
  } else {
    return <LoadingSpinner/>
  }
}