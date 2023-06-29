'use client'

import { getAccessToken, getAlbum, getArtist, getTrack } from "@/app/apiMethods"
import { Artist } from "@/app/types"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"

export default function FavoriteCard({ id, type }: { id: string, type: string }) {
  if (type == "album") {
    return <FavoriteAlbumCard id={id}/>
  } else if (type == "track") {
    return <FavoriteTrackCard id={id}/>
  } else {
    return <FavoriteArtistCard id={id}/>
  }
}

function FavoriteAlbumCard({ id }: { id: string }) {
  const accessTokenQuery = useQuery({queryKey: ['access-token'], queryFn: getAccessToken})
  const accessToken = accessTokenQuery.data

  const { data: favAlbum, isLoading } = useQuery({
    queryKey: ['album', id],
    queryFn: () => getAlbum(id, accessToken),
    enabled: !!accessToken
  })

  return (
    <div className="flex flex-col space-y-3 shadow-2xl border-zinc-800 border rounded-md p-5">
    {
      favAlbum && !isLoading ?
      <div className="flex space-x-5 items-center">
        {
          favAlbum.images &&
          <div className="relative h-16 w-16">
            <Image
              src={favAlbum.images[0].url || ""}
              fill
              alt={favAlbum.name}
              className="rounded-md"
            />
          </div>
        }
        <div className="flex flex-col space-y-1">
          <Link href={`/album/${favAlbum.id}`} className="font-medium hover:opacity-80 duration-300">{favAlbum.name.length > 15 ? favAlbum.name.substring(0, 15) + "..." : favAlbum.name}</Link>
          <p className="text-xs text-zinc-400 font-medium">
            {favAlbum.artists.map((artist: Artist) => {
              return <span key={artist.id}> {artist.name} </span>;
            })}
          </p>
        </div>
      </div> :
      <Skeleton/>
    }
    </div>
  )
}

function FavoriteArtistCard({ id }: { id: string }) {
  const accessTokenQuery = useQuery({queryKey: ['access-token'], queryFn: getAccessToken})
  const accessToken = accessTokenQuery.data

  const { data: favArtist, isLoading } = useQuery({
    queryKey: ['artist', id],
    queryFn: () => getArtist(id, accessToken),
    enabled: !!accessToken
  })

  return (
    <div className="flex flex-col space-y-3 shadow-2xl border-zinc-800 border rounded-md p-5">
    {
      favArtist && !isLoading ?
      <div className="flex space-x-5 items-center">
        {
          favArtist.images &&
          <div className="relative h-16 w-16">
            <Image
              src={favArtist.images[0].url || ""}
              fill
              alt={favArtist.name}
              className="rounded-md"
            />
          </div>
        }
        <p className="font-medium">{favArtist.name.length > 15 ? favArtist.name.substring(0, 15) + "..." : favArtist.name}</p>
      </div> :
      <Skeleton/>
    }
    </div>
  )
}

function FavoriteTrackCard({ id }: { id: string }) {
  const accessTokenQuery = useQuery({queryKey: ['access-token'], queryFn: getAccessToken})
  const accessToken = accessTokenQuery.data

  const { data: favTrack, isLoading } = useQuery({
    queryKey: ['track', id],
    queryFn: () => getTrack(id, accessToken),
    enabled: !!accessToken
  })

  return (
    <div className="flex flex-col space-y-3 shadow-2xl border-zinc-800 border rounded-md p-5">
    {
      favTrack && !isLoading ?
      <div className="flex space-x-5 items-center">
        {
          favTrack.album.images &&
          <div className="relative h-16 w-16">
            <Image
              src={favTrack.album.images[0].url || ""}
              fill
              alt={favTrack.name}
              className="rounded-md"
            />
          </div>
        }
        <div className="flex flex-col space-y-1">
          <Link href={`/track/${favTrack.id}`} className="hover:opacity-80 duration-300 font-medium">{favTrack.name.length > 15 ? favTrack.name.substring(0, 15) + "..." : favTrack.name}</Link>
          <p className="text-xs text-zinc-400 font-medium">
            {favTrack.artists.map((artist: Artist) => {
              return <span key={artist.id}> {artist.name} </span>;
            })}
          </p>
        </div>
      </div> :
      <Skeleton/>
    }
    </div>
  )
}

function Skeleton() {
  return (
    <div className="flex space-x-5 items-center">
      <div className="h-16 w-16 bg-zinc-800 animate-pulse rounded-md"></div>
      <div className="flex flex-col space-y-2">
        <div className="h-2 w-32 bg-zinc-800 animate-pulse rounded-md"></div>
        <div className="h-2 w-20 bg-zinc-800 animate-pulse rounded-md"></div>
        <div className="h-2 w-10 bg-zinc-800 animate-pulse rounded-md"></div>
      </div>
    </div>
  )
}