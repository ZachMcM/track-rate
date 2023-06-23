'use client'

import { getAccessToken, getAlbum, getTrack } from "@/app/apiMethods";
import { Artist } from "@/app/apiTypes";
import { Review } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import RatingDisplay from "./RatingDisplay";
import NameComponent from "./NameComponent";
import Link from "next/link";

export default function ReviewCard({ review }: { review: Review }) {
  if (review.type == "track") {
    return <TrackReviewCard review={review}/>
  } else {
    return <AlbumReviewCard review={review}/>
  }
}

const AlbumReviewCard = ({ review }: { review: Review }) => {
  const tokenQuery = useQuery({ queryKey: ['access-token'], queryFn: getAccessToken })
  const accessToken = tokenQuery.data

  const albumQuery = useQuery({ 
    queryKey: ['album', review.itemId], 
    queryFn: () => getAlbum(accessToken, review.itemId),
    enabled: !!accessToken
  })

  return (
    <>
      {
        albumQuery.status != 'loading' && albumQuery.data ?
        <Link 
          className="bg-gray-950 hover:bg-gray-700 duration-300 flex flex-col space-y-5 p-8 lg:p-10 border border-gray-700 rounded-md"
          href={`/review/${review.id}`}
        >
          <div className="flex space-x-8 items-center">
            <div>
              <Image
                src={albumQuery.data.images[0].url}
                height={200}
                width={200}
                alt={albumQuery.data.name}
                className="rounded-md"
              />
            </div>
            <div className="flex flex-col space-y-3 w-full">
              <div className="flex flex-col space-y-1">
                <h1 className="font-bold md:text-xl">
                <NameComponent value={albumQuery.data.name} max={30}/>
                </h1>
                <p className="text-sky-400 text-xs md:text-sm">
                  {albumQuery.data.artists.map((artist: Artist) => {
                    return <span key={artist.id}> <NameComponent value={artist.name} max={30}/></span>
                  })}
                </p>
              </div>
              <div className="hidden lg:flex flex-col space-y-3">
                <RatingDisplay rating={review.rating}/>
                <div className="flex flex-col space-y-1">
                  <p className="font-semibold text-lg">{review.title}</p>
                  <p className="font-medium text-gray-400">{review.content}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:hidden flex flex-col space-y-3 w-full">
            <RatingDisplay rating={review.rating}/>
            <div className="flex flex-col space-y-1">
              <p className="font-semibold text-lg">{review.title}</p>
              <p className="font-medium text-gray-400">{review.content}</p>
              <p className="text-xs"></p>
            </div>
          </div>
        </Link> :
        <div className="bg-gray-700 h-52 animate-pulse rounded-md w-full"></div>
      }
    </>
  )
}

const TrackReviewCard = ({ review }: { review: Review }) => {
  const tokenQuery = useQuery({ queryKey: ['access-token'], queryFn: getAccessToken })
  const accessToken = tokenQuery.data

  const trackQuery = useQuery({ 
    queryKey: ['track', review.itemId], 
    queryFn: () => getTrack(accessToken, review.itemId),
    enabled: !!accessToken
  })

  return (
    <>
      {
        trackQuery.status != 'loading' && trackQuery.data ?
        <Link 
          className="hover:bg-gray-700 duration-300 bg-gray-950 flex flex-col space-y-5 p-8 lg:p-10 border border-gray-700 rounded-md"
          href={`/review/${review.id}`}
        >
          <div className="flex space-x-8 items-center">
            <div>
              <Image
                src={trackQuery.data?.album.images[0].url}
                height={200}
                width={200}
                alt={trackQuery.data?.name}
                className="rounded-md"
              />
            </div>
            <div className="flex flex-col space-y-3 w-full">
              <div className="flex flex-col space-y-1">
                <h1 className="font-bold md:text-xl">
                  <NameComponent value={trackQuery.data.name} max={30}/>
                </h1>
                <div className="text-gray-400">
                  <NameComponent value={trackQuery.data.album.name} max={30}/>
                </div>
                <p className="text-sky-400 text-xs md:text-sm">
                  {trackQuery.data?.artists.map((artist: Artist) => {
                    return <span key={artist.id}> <NameComponent value={artist.name} max={30}/></span>
                  })}
                </p>
              </div>
              <div className="hidden lg:flex flex-col space-y-3">
                <RatingDisplay rating={review.rating}/>
                <div className="flex flex-col space-y-1">
                  <p className="font-semibold text-lg">{review.title}</p>
                  <p className="font-medium text-gray-400">{review.content}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:hidden flex flex-col space-y-3 w-full">
            <RatingDisplay rating={review.rating}/>
            <div className="flex flex-col space-y-1">
              <p className="font-semibold text-lg">{review.title}</p>
              <p className="font-medium text-gray-400">{review.content}</p>
            </div>
          </div>
        </Link> :
        <div className="bg-gray-700 h-52 rounded-md w-full animate-pulse"></div>
      }
    </>
  )
}

