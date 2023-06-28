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

  const { data: album } = useQuery({ 
    queryKey: ['album', review.itemId],
    queryFn: () => getAlbum(review.itemId, accessToken),
    enabled: !!accessToken
  })

  if (album) {
    return (
      <Link href={`/review/${review.id}`} className="shadow-2xl flex flex-col space-y-5 md:space-x-8 md:space-y-0 md:flex-row items-center p-8 rounded-md border border-zinc-700 hover:opacity-50 duration-300">
        <Image
          src={album.images[0].url}
          width={150}
          height={150}
          alt={album.name}
          className="rounded-md"
        />
        <div className="flex flex-col space-y-5 items-center md:items-start">
          <div className="flex flex-col space-y-1 items-center md:items-start">
            <p className="text-center md:text-start font-bold">{album.name}</p>
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
  }
}

function TrackReviewCard({ review }: { review: Review, }) {
  const accessTokenQuery = useQuery({
    queryKey: ['access-token'],
    queryFn: getAccessToken
  })

  const accessToken = accessTokenQuery.data

  const { data: track } = useQuery({ 
    queryKey: ['track', review.itemId],
    queryFn: () => getTrack(review.itemId, accessToken),
    enabled: !!accessToken
  })

  if (track) {
    return (
      <Link href={`/review/${review.id}`} className="shadow-2xl flex space-x-8 items-center p-8 rounded-md border border-zinc-700 hover:opacity-50 duration-300 bg-zinc-950">
        <Image
          src={track.album.images[0].url}
          width={100}
          height={100}
          alt={track.name}
          className="rounded-md"
        />
        <div className="flex flex-col space-y-5">
          <div className="flex flex-col space-y-1">
            <p className="font-bold">{track.name}</p>
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
  }
}