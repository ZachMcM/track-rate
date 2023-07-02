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

  // Todo
  // if (review && !isLoading) {
  //   return (
  //     <div className="flex flex-col space-y-10">
  //       {
  //         review.type == "album" ?
  //         <AlbumData id={review.itemId}/> :
  //         <TrackData id={review.itemId}/>
  //       }
  //       <div className="w-full flex flex-col space-y-14">
  //         <div className="flex flex-col space-y-5 w-full">
  //           <Link  href={`/profile/${review.userId}`} className="hover:opacity-80 duration-300 flex items-center space-x-2">
  //             <Image
  //               src={review.user.image || ""}
  //               height={35}
  //               width={35}
  //               alt="avatar"
  //               className="rounded-full p-0.5 border border-zinc-800"
  //             />
  //             <p className="font-bold text-zinc-400">{review.user.name}</p>
  //           </Link>
  //           <RatingDisplay rating={review.rating}/>
  //           <p className="font-medium text-white whitespace-pre-wrap">{review.content}</p>
  //           {
  //             review.type == "album" &&
  //             <p className="text-zinc-400 text-sm font-medium">Favorite Track: <Link className="font-extrabold hover:opacity-80 duration-300" href={`/track/${review.favoriteTrackId}`}>{review.favoriteTrackName}</Link></p>
  //           }
  //           <ReviewLikes review={review} initialLike={initialLike()}/>
  //         </div>
  //         <ReviewComments review={review}/>
  //       </div>        
  //     </div>
  //   )
  // } else {
  //   return (
  //     <DataSkeleton/>
  //   )
  // }
}