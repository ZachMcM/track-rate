'use client'

import { getUserReviews } from "@/app/apiMethods"
import { useQuery } from "@tanstack/react-query"
import { formatName } from "@/app/apiMethods";
import RatingDisplay from "@/components/RatingDisplay";
import Image from "next/image";
import Link from "next/link";
import { ExtendedReview } from "@/app/types";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Activity({ params }: { params: {id: string }}) {
  const { data: user, isLoading } = useQuery({
    queryFn: () => getUserReviews(params.id),
    queryKey: ['user-reviews', { id: params.id }]
  })

  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"]

  if (user && !isLoading) {
    return (
      <div className="flex flex-col space-y-3">
        <p className="font-medium text-lg">Activity</p>
        {
          user.reviews.length != 0 ?
          <div className="flex flex-col space-y-4 drop-shadow-lg border border-zinc-200 rounded-lg bg-white p-4">
            {
              user.reviews.map((review: ExtendedReview) => {
                return (
                  <div className="relative flex justify-between p-2 rounded-lg items-center hover:bg-zinc-100 duration-300">
                    <div className="flex space-x-5 items-center">
                      <div className="h-16 w-16 flex text-zinc-500 border border-zinc-200 text-sm justify-center items-center aspect-square bg-zinc-100 rounded-lg">
                        <div  className="flex flex-col items-center">
                          <p>{month[(new Date(review.createdAt)).getMonth()]}</p>
                          <p>{(new Date(review.createdAt)).getDate()}</p>
                        </div>
                      </div>
                      <div className="flex space-x-3 items-center">
                        <Link 
                          href={review.type == "artist" ? `/artist/${review.artistIds[0]}` : `/album/${review.albumId}` || ""} 
                          className={`z-10 hover:ring-4 ring-sky-200 duration-300 relative h-16 w-16 ${review.type == "artist" ? "rounded-full" : "rounded-lg"} drop-shadow-lg`}
                        >
                          <Image
                            src={review.type == "artist" ? review.artistImages[0] : review.albumImage || ""}
                            fill
                            alt={(review.type == "arist" ? review.artistNames[0] : review.type == "album" ? review.albumName : review.trackName) || ""}
                            className={`${review.type == "artist" ? "rounded-full" : "rounded-lg"} drop-shadow-lg`}
                          />
                        </Link>
                        <div className="flex flex-col">
                          <Link 
                            href={review.type == "artist" ? `/artist/${review.artistIds[0]}` : review.type == "album" ? `/album/${review.albumId}` : `/track/${review.trackId}`} 
                            className="z-10 font-medium hover:text-sky-400 duration-300"
                          >
                            {(review.type == "artist" ? formatName(review.artistNames[0], 25) : review.type == "album" ? formatName(review.albumName || "", 25) : formatName(review.trackName || "", 25))}
                          </Link>
                          {
                            review.type != "artist" &&
                            <p className="text-sm text-zinc-500">
                              {
                                review.artistNames.map((name: string, i: number) => {
                                  return (
                                    <Link className="z-10 hover:underline" href={`/artist/${review.artistIds[i]}`}>{formatName(name, 25)}{i != review.artistNames.length - 1 && ","} </Link>
                                  )
                                })
                              }
                            </p>
                          }
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block mr-10"><RatingDisplay rating={review.rating}/></div>
                    <Link href={`/review/${review.id}`} className="absolute z-0 inset-0 h-full w-full"></Link>
                  </div>
                )
              })
            }
          </div> :
          <div className="flex px-5 py-10 bg-white rounded-md justify-center items-center drop-shadow-lg">
            <p className="text-zinc-500 text-sm">No activity</p>
          </div>
        }
      </div>
    )
  } else {
    return <LoadingSpinner/>
  }
}