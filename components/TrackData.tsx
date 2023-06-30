'use client'

import Image from "next/image"
import { Artist } from "@/app/types"
import { BsSpotify } from "react-icons/bs"
import { useQuery } from "@tanstack/react-query"
import { formatCompactNumber, getAccessToken, getRating, getTrack } from "@/app/apiMethods"
import DataSkeleton from "./DataSkeleton"
import Link from "next/link"
import { TbPencil, TbPlaylistAdd, TbStarFilled } from "react-icons/tb"
import { useContext, useState } from "react"
import { ReviewFormContext, ReviewFormProviderType } from "./ReviewFormProvider"

export default function TrackData({ id }: { id: string }) {
  const accessTokenQuery = useQuery({
    queryKey: ['access-token'],
    queryFn: getAccessToken
  })

  const accessToken = accessTokenQuery?.data

  const { data: track, isLoading } = useQuery({
    queryKey: ['track', id],
    queryFn: () => getTrack(id, accessToken),
    enabled: !!accessToken
  })

  const { data: rating, isLoading: ratingLoading } = useQuery({
    queryKey: ['score', id],
    queryFn: () => getRating(id)
  })

  const {
    setTrackTarget
  } = useContext(ReviewFormContext) as ReviewFormProviderType

  const [totalTooltip, setTotalTooltip] = useState<boolean>(false)
  const [starsTooltip, setStarsTooltip] = useState<boolean>(false)

  if (track && !isLoading && rating && !ratingLoading) {
    return (
      <div className="flex items-center flex-col space-y-5 md:space-y-0 md:flex-row md:space-x-10">
        <Image
          src={track.album.images[0].url}
          width={240}
          height={240}
          alt={track.name}
          className="rounded-md"
        />
        <div className="flex flex-col space-y-5 items-center md:items-start">
          <div className="flex flex-col space-y-3">
            <div className="flex flex-col space-y-1">
              <Link href={`/track/${track.id}`} className="hover:opacity-80 duration-300 font-bold md:text-xl text-center md:text-start">{track.name}</Link>
              <Link href={`/album/${track.album.id}`} className="hover:opacity-80 duration-300 font-bold text-center md:text-start">{track.album.name}</Link>
              <p className="text-zinc-400 text-center md:text-start">
                {
                  track.artists.map((artist: Artist, i: number) => {
                    return <span key={artist.id}> {artist.name}{i != track.artists.length - 1 && ","} </span>;
                  })
                }
              </p>
            </div>

            <div className="justify-center md:justify-start flex space-x-3 items-center text-zinc-400 text-sm font-medium">
              <div className="relative">
                <button
                  className="flex space-x-1 items-center hover:text-white"
                  onMouseEnter={() => setTotalTooltip(true)}
                  onMouseLeave={() => setTotalTooltip(false)}
                >
                  <p>{formatCompactNumber(rating.total)}</p>
                  <TbPencil className="text-lg"/>
                </button>
                <div className={`${!totalTooltip ? "opacity-0" : "opacity-100 delay-300"} duration-300 py-1 px-3 text-xs text-zinc-950 bg-white rounded-md absolute w-max -top-7 -left-9`}>Total reviews</div>                  
              </div>
              <div className="relative">
                <button
                  className="flex space-x-1 items-center hover:text-white"
                  onMouseEnter={() => setStarsTooltip(true)}
                  onMouseLeave={() => setStarsTooltip(false)}
                >
                  <p>{formatCompactNumber(rating.avg)}/5</p>
                  <TbStarFilled/>
                </button>
                <div className={`${!starsTooltip ? "opacity-0" : "opacity-100 delay-300"} duration-300 py-1 px-3 text-xs text-zinc-950 bg-white rounded-md absolute w-max -top-7 -left-9`}>Average rating</div>                  
              </div>
            </div>
          </div>
          <div className="flex space-x-5 items-center">
            <a href={track.external_urls.spotify} className="flex items-center space-x-2 bg-white tet-zinc-950 py-2 px-4 rounded-md hover:opacity-80 duration-300">
              <BsSpotify className="text-lg"/>
              <p className="font-medium text-sm">Spotify</p>
            </a>
            <button
              className="flex space-x-2 items-center text-sm px-4 py-2 font-medium border-zinc-800 border hover:bg-zinc-800 duration-300 rounded-md"
              onClick={() => setTrackTarget(track)}
            >
              <p>Review</p>
              <TbPlaylistAdd className="text-xl"/>
            </button>
          </div>
        </div>
      </div> 
    )    
  } else {
    return <DataSkeleton/>
  }
}