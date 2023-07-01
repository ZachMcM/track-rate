'use client'

import { Artist, FullReview } from "@/app/types";
import { Review } from "@prisma/client";
import Image from "next/image";
import RatingDisplay from "./RatingDisplay";
import { useQuery } from "@tanstack/react-query";
import { formatCompactNumber, formatName, getAccessToken, getAlbum, getTrack } from "@/app/apiMethods";
import Link from "next/link";
import { TbMessageCircle2Filled } from "react-icons/tb";
import ReviewLikes from "./ReviewLikes";
import { useSession } from "next-auth/react"

export default function ReviewCard({ review }: { review: FullReview }) {
  const { data: session } = useSession()

  const getInitialLike = (): boolean => {
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

  const initialLike = getInitialLike()

  return (
    <div className="relative shadow-2xl shadow-black">
      <Link href={`/review/${review.id}`} className="w-full h-full hover:opacity-80 duration-300 flex flex-col space-y-3 rounded-md border border-zinc-800">
        <div className="flex flex-col space-y-10 p-8">
          {
            review.type == "album" ? <AlbumData id={review.itemId}/> : <TrackData id={review.itemId}/>
          }
          <div className="flex flex-col space-y-3 pb-10">
            <RatingDisplay rating={review.rating}/>
            <p className="font-medium w-full whitespace-pre-wrap">{review.content}</p>
            <div className="flex space-x-2 items-center">
              <Image
                src={review.user?.image || ""}
                width={40}
                height={40}
                alt="avatar"
                className="rounded-full p-0.5 border border-zinc-800"
              />
              <p className="font-bold text-zinc-400">{review.user.name}</p>
            </div>
          </div>
        </div>
      </Link>
      <div className="absolute bottom-8 left-8 flex space-x-10 items-center">
        <ReviewLikes initialLike={initialLike} review={review}/>
        <Link href={`/review/${review.id}`} className="flex space-x-2 items-center text-zinc-400 hover:opacity-80 duration-300">
          <TbMessageCircle2Filled/>
          <p className="text-sm">{formatCompactNumber(review.comments.length)} Comment{review.comments.length != 1 && "s"}</p>
        </Link>
      </div>
    </div>
  )
}

function AlbumData({ id }: { id: string}) {
  const accessTokenQuery = useQuery({ 
    queryKey: ['access-token'],
    queryFn: getAccessToken
  })

  const accessToken = accessTokenQuery.data

  const { data: album, isLoading } = useQuery({ 
    queryKey: ['album', id],
    queryFn: () => getAlbum(id, accessToken),
    enabled: !!accessToken
  })

  if (album && !isLoading) {
    return (
      <div className="flex space-x-5 items-center">
        <div className="relative h-24 w-24">
          <Image
            src={album.images[0].url}
            fill
            alt={album.name}
            className="rounded-md"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <p className="font-bold hover:opacity-80 duration-300 md:hidden">{formatName(album.name, 20)}</p>
          <p className="font-bold hover:opacity-80 duration-300 hidden md:block">{album.name}</p>
          <p className="font-medium text-zinc-400 text-sm">
            {
              album.artists.map((artist: Artist, i: number) => {
                return <span key={artist.id}> {artist.name}{i != album.artists.length - 1 && ","} </span>;
              })
            }
          </p>
        </div>
      </div> 
    )    
  } else {
    return <Skeleton/>
  }
}

function TrackData({ id }: { id: string}) {
  const accessTokenQuery = useQuery({ 
    queryKey: ['access-token'],
    queryFn: getAccessToken
  })

  const accessToken = accessTokenQuery.data

  const { data: track, isLoading } = useQuery({ 
    queryKey: ['track', id],
    queryFn: () => getTrack(id, accessToken),
    enabled: !!accessToken
  })

  if (track && !isLoading) {
    return (
      <div className="flex space-x-5 items-center">
        <div className="relative h-24 w-24">
          <Image
            src={track.album.images[0].url}
            fill
            alt={track.name}
            className="rounded-md"
          />
        </div>
        <div className="flex flex-col space-y-1">
        <p className="font-bold hover:opacity-80 duration-300 md:hidden">{formatName(track.name, 20)}</p>
          <p className="font-bold hover:opacity-80 duration-300 hidden md:block">{track.name}</p>
          <p className="font-medium text-zinc-400 text-sm">
            {
              track.artists.map((artist: Artist, i: number) => {
                return <span key={artist.id}> {artist.name}{i != track.artists.length - 1 && ","} </span>;
              })
            }
          </p>
        </div>
      </div> 
    )    
  } else {
    return <Skeleton/>
  }
}

function Skeleton() {
  return (
    <div className="flex space-x-5 items-center">
      <div className="h-32 w-32 rounded-md bg-zinc-800 animate-pulse"></div>
      <div className="flex flex-col space-y-2">
        <div className="h-2 w-32 rounded-md bg-zinc-800 animate-pulse"></div>
        <div className="h-2 w-16 rounded-md bg-zinc-800 animate-pulse"></div>
      </div>
    </div>
  )
}