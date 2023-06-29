'use client'

import Image from "next/image"
import { Artist } from "@/app/types"
import { BsSpotify } from "react-icons/bs"
import { useQuery } from "@tanstack/react-query"
import { getAccessToken, getScore, getTrack } from "@/app/apiMethods"
import DataSkeleton from "./DataSkeleton"
import Link from "next/link"

export default function TrackData({ id }: { id: string }) {
  const accessTokenQuery = useQuery({
    queryKey: ['access-token'],
    queryFn: getAccessToken
  })

  const accessToken = accessTokenQuery?.data

  const { data: track, isLoading } = useQuery({
    queryKey: ['album', id],
    queryFn: () => getTrack(id, accessToken),
    enabled: !!accessToken
  })

  const { data: score } = useQuery({
    queryKey: ['score', id],
    queryFn: () => getScore(id)
  })

  if (track && !isLoading) {
    return (
      <div className="flex items-center flex-col space-y-5 md:space-y-0 md:flex-row md:space-x-10">
        <Image
          src={track.album.images[0].url}
          width={240}
          height={240}
          alt={track.album.name}
          className="rounded-md"
        />
        <div className="flex flex-col space-y-3 items-center md:items-start">
          <Link href={`/track/${track.id}`} className="hover:opacity-80 duration-300 font-bold md:text-xl text-center md:text-start">{track.name}</Link>
          <Link href={`/album/${track.album.id}`} className="hover:opacity-80 duration-300 text-lg font-medium text-center md:text-start text-zinc-400">{track.album.name}</Link>
          <p className="text-zinc-400 text-center md:text-start">
            {
              track.artists.map((artist: Artist) => {
                return <span key={artist.id}> {artist.name} </span>
              })
            }
          </p>
          <div className="flex space-x-5 items-center">
            <a href={track.external_urls.spotify} className="flex items-center space-x-2 hover:text-green-400 text-zinc-400 duration-300">
              <BsSpotify className="text-xl"/>
              <p className="font-medium text-sm">Spotify</p>
            </a>
            {
              score &&
              <p className="font-medium text-sm text-zinc-400">{score}% Postive Reviews</p>
            }
          </div>
        </div>
      </div> 
    )    
  } else {
    return <DataSkeleton/>
  }
}