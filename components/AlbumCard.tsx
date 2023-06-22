'use client'

import { Album, Artist } from "@/app/apiTypes";
import Image from "next/image";
import Link from "next/link";

export default function AlbumCard({ album } : { album: Album}) {
  return (
    <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-6 items-center p-8 border rounded-md border-gray-700">
      <Image
        src={album.images[1].url}
        height={80}
        width={80}
        alt={album.name}
        className="rounded-md w-full md:w-fit"
      />
      <div className="flex flex-col items-center md:items-start space-y-1">
        {
          album.name.length > 50 ? 
          <p className="font-medium text-center md:text-start">{album.name.substring(0, 50)}...</p> :
          <p className="font-medium text-center md:text-start">{album.name}</p>
        }
        <div className="text-gray-400 hover:opacity-80 flex items-center space-x-1.5 text-center md:text-start">
            {
              album.artists.map((artist: Artist) => {
                return (
                  <Link href={`/artists/${artist.id}`} key={artist.id} className="w-fit hover:opacity-80">
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
        <p className="text-sky-400 text-sm">{(new Date(album.release_date)).getFullYear()}</p>
      </div>
    </div>
  )
}