'use client'

import { Artist } from "@/app/types";
import { Review } from "@prisma/client";
import Image from "next/image";
import RatingDisplay from "./RatingDisplay";
import { useQuery } from "@tanstack/react-query";
import { getAccessToken, getAlbum, getTrack, getUser } from "@/app/apiMethods";
import Link from "next/link";

export default function ReviewCard({ review, name }: { review: Review, name: boolean }) {
  if (review.type == "album") {
    return <AlbumReviewCard review={review}/>
  } else {
    return <TrackReviewCard review={review}/>
  }
}

function AlbumReviewCard({ review }: { review: Review }) {
  const accessTokenQuery = useQuery({
    queryKey: ['access-token'],
    queryFn: getAccessToken
  })

  const accessToken = accessTokenQuery.data

  const { data: album, isLoading } = useQuery({ 
    queryKey: ['album', review.itemId],
    queryFn: () => getAlbum(review.itemId, accessToken),
    enabled: !!accessToken
  })

  if (album && !isLoading) {
    return (
      <Link href={`/review/${review.id}`} className=" shadow-2xl flex flex-col space-y-5 md:space-x-8 md:space-y-0 md:flex-row items-center p-8 rounded-md border border-zinc-800 hover:opacity-50 duration-300">
        <div className="relative h-32 w-32">
          <Image
            src={album.images[0].url}
            fill
            alt={album.name}
            className="rounded-md"
          />
        </div>
        <div className="flex flex-col space-y-5 items-center md:items-start">
          <div className="flex flex-col space-y-1 items-center md:items-start">
            <p className="text-center md:text-start font-bold hover:opacity-80 duration-300">{album.name.length > 20 ? album.name.substring(0, 20) + "..." : album.name}</p>
            <p className="text-center md:text-start font-medium text-zinc-400 text-sm">
              {
                album.artists.map((artist: Artist) => {
                  return <span key={artist.id}> {artist.name} </span>
                })
              }
            </p>
          </div>
          <RatingDisplay rating={review.rating}/>
          <p className="font-medium">{review.content}</p>
        </div>
      </Link>
    )
  } else {
    return (
      <Skeleton/>
    )
  }
}

function TrackReviewCard({ review }: { review: Review, }) {
  const accessTokenQuery = useQuery({
    queryKey: ['access-token'],
    queryFn: getAccessToken
  })

  const accessToken = accessTokenQuery.data

  const { data: track, isLoading } = useQuery({ 
    queryKey: ['track', review.itemId],
    queryFn: () => getTrack(review.itemId, accessToken),
    enabled: !!accessToken
  })

  if (track && !isLoading) {
    return (
      <Link href={`/review/${review.id}`} className="shadow-2xl flex space-x-8 items-center p-8 rounded-md border border-zinc-800 hover:opacity-50 duration-300 bg-zinc-950">
        <div className="relative h-32 w-32">
          <Image
            src={track.album.images[0].url}
            fill
            alt={track.album.name}
            className="rounded-md"
          />
        </div>
        <div className="flex flex-col space-y-5 items-center md:items-start">
          <div className="flex flex-col space-y-1 items-center md:items-start">
            <p className="hover:opacity-80 duration-300 font-bold">{track.name.length > 20 ? track.name.substring(0, 20) + "..." : track.name}</p>
            <p className="text-zinc-400 text-sm">
              {
                track.artists.map((artist: Artist) => {
                  return <span key={artist.id}> {artist.name} </span>
                })
              }
            </p>
          </div>
          <RatingDisplay rating={review.rating}/>
          <p className="text-zinc-400 font-medium">{review.content}</p>
        </div>
      </Link>
    )
  } else {
    return (
      <Skeleton/>
    )
  }
}

function Skeleton() {
  return (
    <div className="shadow-2xl flex flex-col space-y-5 md:space-x-8 md:space-y-0 md:flex-row items-center p-8 rounded-md border border-zinc-800">
      <div className="h-32 w-32 rounded-md bg-zinc-800 animate-pulse"></div>
      <div className="flex flex-col space-y-2">
        <div className="h-2 w-72 rounded-md bg-zinc-800 animate-pulse"></div>
        <div className="h-2 w-64 rounded-md bg-zinc-800 animate-pulse"></div>
        <div className="h-2 w-32 rounded-md bg-zinc-800 animate-pulse"></div>
        <div className="h-2 w-72 rounded-md bg-zinc-800 animate-pulse"></div>
        <div className="h-2 w-16 rounded-md bg-zinc-800 animate-pulse"></div>
      </div>
    </div>
  )
}