'use client'

import { getReview } from "@/app/apiMethods"
import { useQuery } from "@tanstack/react-query"
import RatingDisplay from "./RatingDisplay"
import Link from "next/link"
import { useSession } from "next-auth/react"
import ReviewComments from "./ReviewComments"
import ReviewLikes from "./ReviewLikes"
import AlbumData from "./AlbumData"
import TrackData from "./TrackData"
import DataSkeleton from "./DataSkeleton"
import Image from "next/image"

export default function ReviewContent({ id }: { id: string }) {
  const { data: review, isLoading } = useQuery({
    queryKey: ['review', id],
    queryFn: () => getReview(id)
  })

  const { data: session } = useSession()

  const initialLike = (): boolean => {
    if (session && session.user && review) {
      for (const like of review.likes) {
        if (session.user.id == like.userId) {
          return true
        }
      }
      return false
    }
    return false
  }

  if (review && !isLoading) {
    return (
      <div className="flex flex-col space-y-10">
        {
          review.type == "album" ?
          <AlbumData id={review.itemId}/> :
          <TrackData id={review.itemId}/>
        }
        <div className="w-full flex flex-col space-y-14">
          <div className="flex flex-col space-y-5 w-full">
            <div className="flex items-center space-x-2 text-zinc-400">
              <Link  href={`/profile/${review.userId}`} className="hover:opacity-80 duration-300">
                <Image
                  src={review.user.image || ""}
                  height={40}
                  width={40}
                  alt="avatar"
                  className="rounded-full p-1 border border-zinc-800"
                />
              </Link>
              <div className="flex items-center space-x-1">
                <p className="">Review by</p>
                <Link  href={`/profile/${review.userId}`} className="text-zinc-400 flex items-center space-x-2 font-bold hover:opacity-80 duration-300">
                  <p>{review.user.name}</p>
                </Link>
              </div>
            </div>
            <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:space-x-3">
              <h3 className="font-semibold text-xl">{review.title}</h3>
              <RatingDisplay rating={review.rating}/>
            </div>
            {
              review.type == "album" &&
              <p className="text-zinc-400">Favorite Track: <Link className="font-bold hover:opacity-80 duration-300" href={`/track/${review.favoriteTrackId}`}>{review.favoriteTrackName}</Link></p>
            }
            <p className="font-medium text-zinc-400">{review.content}</p>
            <ReviewLikes review={review} initialLike={initialLike()}/>
          </div>
          <ReviewComments review={review}/>
        </div>        
      </div>
    )
  } else {
    return (
      <DataSkeleton/>
    )
  }
}