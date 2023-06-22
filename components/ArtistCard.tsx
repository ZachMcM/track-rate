'use clienet'

import { Artist } from "@/app/apiTypes"
import Image from "next/image"
import Link from "next/link"
import { uid } from "uid"

export default function ArtistCard({ artist } : { artist: Artist }) {
  return (
    <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-6 items-center p-8 border rounded-md border-gray-700">
      { 
        artist.images[1] &&
        <Image
          src={artist.images[1].url}
          height={80}
          width={80}
          alt={artist.name}
          className="rounded-md w-full md:w-fit"
        />
      }
      <div className="flex flex-col items-center md:items-start space-y-1">
        <Link href={`/artists/${artist.id}`} className="font-medium text-lg text-center md:text-start">
          {
            artist.name.length > 50 ?
            <p>{artist.name.substring(0, 50)}...</p> :
            <p>{artist.name}</p>
          }
        </Link>
        <p className="text-ray-400 capitalize text-gray-400 text-center md:text-start">
            {
              artist.genres.map((genre: string, i: number) => {
                return <span className={``} key={uid()}> {genre} </span> 
              })
            }
        </p>
        <p className="text-sm text-sky-400">Popularity {artist.popularity}/100</p>
      </div>
    </div>
  )
}