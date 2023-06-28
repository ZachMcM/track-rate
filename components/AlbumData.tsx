import Image from "next/image"
import { Artist } from "@/app/types"
import { BsSpotify } from "react-icons/bs"
import { getAlbum } from "@/app/serverMethods"

export default async function AlbumData({ id }: { id: string }) {
  const album = await getAlbum(id)

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
      <h2 className="font-bold text-xl md:text-2xl text-center md:text-start">{album.name}</h2>
        <p className="text-zinc-400">
          {
            album.artists.map((artist: Artist) => {
              return <span key={artist.id}> {artist.name} </span>
            })
          }
        </p>
        <a href={album.external_urls.spotify} className="text-green-400 hover:opacity-80 duration-300">
          <BsSpotify className="text-3xl"/>
        </a>
      </div>
    </div>
  )
}