'use client'

import Image from "next/image"
import { Artist } from "@/app/types"
import { BsSpotify } from "react-icons/bs"
import { useQuery } from "@tanstack/react-query"
import { getAccessToken, getAlbum, getScore } from "@/app/apiMethods"
import DataSkeleton from "./DataSkeleton"
import Link from "next/link"

export default function AlbumData({ id }: { id: string }) {
  const accessTokenQuery = useQuery({
    queryKey: ['access-token'],
    queryFn: getAccessToken
  })

  const accessToken = accessTokenQuery?.data

  const { data: album, isLoading } = useQuery({
    queryKey: ['album', id],
    queryFn: () => getAlbum(id, accessToken),
    enabled: !!accessToken
  })

  const { data: score, isLoading: scoreLoading } = useQuery({
    queryKey: ['score', id],
    queryFn: () => getScore(id)
  })

  console.log(score)

  if (album && !isLoading) {
    return (
      <div className="flex items-center flex-col space-y-5 md:space-y-0 md:flex-row md:space-x-10">
        <Image
          src={album.images[0].url}
          width={240}
          height={240}
          alt={album.name}
          className="rounded-md"
        />
        <div className="flex flex-col space-y-3 items-center md:items-start">
        <Link href={`/album/${album.id}`} className="hover:opacity-80 duration-300 font-bold md:text-xl text-center md:text-start">{album.name}</Link>
          <p className="text-zinc-400">
            {
              album.artists.map((artist: Artist) => {
                return <span key={artist.id}> {artist.name} </span>
              })
            }
          </p>
          <div className="flex space-x-5 items-center">
            <a href={album.external_urls.spotify} className="flex items-center space-x-2 hover:text-green-400 text-zinc-400 duration-300">
              <BsSpotify className="text-xl"/>
              <p className="font-medium text-sm">Spotify</p>
            </a>
            {
              !scoreLoading &&
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