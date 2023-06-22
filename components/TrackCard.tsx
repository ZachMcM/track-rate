'use client'

import { Artist, Track } from "@/app/apiTypes"
import Image from "next/image"
import { TbExplicit, TbPlayerPlayFilled } from "react-icons/tb"
import Link from "next/link"

export default function TrackCard({ track }: { track: Track}) {
  return (
    <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-6 items-center p-8 border rounded-md border-gray-700">
      <a className="relative hover:opacity-80 cursor-pointer w-full md:w-fit" href={track.external_urls.spotify}>
        <Image
          src={track.album.images[1].url}
          height={80}
          width={80}
          alt={track.name}
          className="rounded-md w-full"
        />
        <div className="absolute h-full w-full p-2 z-40 left-0 top-0 flex justify-center items-center bg-gray-950/50">
          <TbPlayerPlayFilled className="text-4xl text-white"/>
        </div>
      </a>
      <div className="flex flex-col items-center md:items-start space-y-1">
        <div className="flex space-x-2 items-center">
        {
          track.name.length > 50 ? 
          <p className="font-medium text-center md:text-start">{track.name.substring(0, 50)}...</p> :
          <p className="font-medium text-center md:text-start">{track.name}</p>
        }
          {track.explicit && <TbExplicit className="text"/>}
        </div>
        
        <div className="text-gray-400 hover:opacity-80 flex items-center space-x-1.5 text-center md:text-start">
          {
            track.artists.map((artist: Artist) => {
              return (
                <Link href={`/artists/${artist.id}`} key={artist.id} className="hover:opacity-80">
                  {
                    artist.name.length > 50 ?
                    <p>{artist.name.substring(0, 50)}...</p> :
                    <p>{artist.name}</p>
                  }
                </Link>
              )
            })
          }
        </div>
        <Link href={`/album/${track.album.id}`} className="text-sky-400 hover:opacity-80 text-sm">
          {
            track.album.name.length > 50 ? 
            <p>{track.album.name.substring(0, 50)}...</p> :
            <p>{track.album.name}</p>
          }
        </Link>
      </div>
    </div>
  )
}