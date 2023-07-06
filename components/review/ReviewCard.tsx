'use client'

import { ExtendedReview } from "@/app/types";
import Image from "next/image";
import RatingDisplay from "./RatingDisplay";
import { formatCompactNumber } from "@/app/apiMethods";
import Link from "next/link";
import { TbMessage } from "react-icons/tb";
import { uid } from "uid";
import LikeButton from "./LikeButton";

export default function ReviewCard({ review }: { review: ExtendedReview }) {
  return (
    <div className="relative hover:bg-zinc-100 first:rounded-t-lg dark:hover:bg-zinc-800 duration-300 h-full flex flex-col p-8 w-full space-y-5 border-b last:border-none dark:border-zinc-700 border-zinc-200">
      <div className="flex items-center space-x-5">
        <Link 
          className={`z-10 shrink-0 relative h-24 w-24 drop-shadow-md  ${review.type == "artist" ? "rounded-full" : "rounded-lg"} hover:opacity-80 duration-300`}
          href={`${review.type == "artist" ? `/artist/${review.artistIds[0]}` : `/album/${review.albumId}`}`} 
        >
          <Image
            src={review.type == "artist" ? review.artistImages[0] : review.albumImage || ""}
            fill
            alt={review.type == "artist" ? review.artistNames[0] : review.albumName || ""}
            className={`${review.type == "artist" ? "rounded-full" : "rounded-lg"} drop-shadow-md`}
          />
        </Link>
        <div className="flex flex-col">
          <Link 
            href={(review.type == "album" ? `album/${review.albumId}` : review.type == "track" ? `/track/${review.trackId}` : `/artist/${review.artistIds[0]}`) || "/"} 
            className="z-10 font-medium text-lg hover:opacity-70 duration-300"
          >
            {review.type == "album" ? review.albumName : review.type == "track" ? review.trackName : review.artistNames[0]}
           </Link>          
          {
            review.type != "artist" &&
            <p className="text-sky-400 text-sm md:text-base z-10">
            {
              review.artistNames.map((name: string, i: number) => {
                return (
                  <Link key={uid()} className="hover:underline text-sm" href={`/artist/${review.artistIds[i]}`}>{name}{i != review.artistNames.length - 1 && ","} </Link>
                )
              })
            }
            </p>
          }
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <div className="text-lg"><RatingDisplay rating={review.rating}/></div>
        <p className="w-full whitespace-pre-wrap">{review.content}</p>
      </div>
      <div className="flex flex-col space-y-5">
        <div className="flex space-x-2 items-center">
          <Link href={`/profile/${review.userId}`} className="h-8 w-8 drop-shadow-md relative hover:opacity-80 duration-300 z-10 rounded-full">
            <Image
              src={review.user?.image || ""}
              fill
              alt="avatar"
              className="rounded-full drop-shadow-md"
            />
          </Link>
          <Link href={`/profile/${review.userId}`} className="hover:opacity-70 duration-300 font-medium z-10 ">{review.user.name}</Link>
        </div>
        <div className="flex items-center space-x-5 text-zinc-500">
          <div className="z-10 text-zinc-500 text-sm flex justify-center"><LikeButton review={review}/></div>
          <Link href={`/review/${review.id}`} className="flex space-x-2 items-center hover:opacity-80 duration-300">
            <TbMessage className="text-xl"/>
            <p className="text-sm">{formatCompactNumber(review.comments.length)} Comment{review.comments.length != 1 && "s"}</p>
          </Link>
        </div>
      </div>
      <Link href={`/review/${review.id}`} className="absolute inset-0 w-full h-full z-0"></Link>
    </div>
  )
}