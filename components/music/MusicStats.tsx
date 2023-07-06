'use client'

import { formatCompactNumber } from "@/app/apiMethods"
import { Rating, ReviewFormParams, ReviewFormProviderType } from "@/app/types"
import { useQuery } from "@tanstack/react-query"
import LoadingSpinner from "../LoadingSpinner"
import { useSession } from "next-auth/react"
import MusicReviewButton from "./MusicReviewButton"

export default function MusicStats({ type, id,  data }: { type: string, id: string, data: ReviewFormParams }) {
  const { data: rating, isLoading } = useQuery({
    queryKey: ['music-rating', { id: id }],
    queryFn: async (): Promise<Rating> => {
      const res = await fetch(`/api/music/rating?id=${id}&type=${type}`)
      const data = await res.json()
      console.log(data)
      return data
    }
  })

  const { data: session } = useSession()

  if (rating && !isLoading) {
    return (
      <div className='flex flex-col space-y-5 shrink-0 w-full md:w-fit'>
        <div className="flex justify-center">
          <div className="flex flex-col text-center dark:border-zinc-800 border-r border-zinc-200px-4 md:px-6">
            <p className="font-bold text-lg md:text-2xl">{formatCompactNumber(rating.involvedReviews._count)}</p>
            <div className="text-sm md:text-base text-zinc-500">Reviews Total</div>
          </div>
          <div className="flex flex-col text-center dark:border-zinc-800 border-r border-zinc-200px-4 md:px-6">
            <p className="font-bold text-lg md:text-2xl">{rating.involvedReviews._avg.rating} / 5</p>
            <div className="text-sm md:text-base text-zinc-500">Avg Rating</div>
          </div>
          <div className="flex flex-col text-center dark:border-zinc-800 px-4 md:px-6">
            <p className="font-bold text-lg md:text-2xl">{rating.yourRating} / 5</p>
            <div className="text-sm md:text-base text-zinc-500">Your Rating</div>
          </div>
        </div>
        {
          session &&
          <MusicReviewButton type={type} data={data} className="py-3 px-4 text-center rounded-md drop-shadow-md text-white bg-sky-400 font-medium hover:opacity-80 duration-300"/>
        }
      </div>
    )
  } else {
    return (
      <LoadingSpinner/>
    )    
  }
}