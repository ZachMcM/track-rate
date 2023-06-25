import Image from "next/image"
import { Album, Artist } from "@/app/apiTypes"
import { BsSpotify } from "react-icons/bs"

const getAccessToken = async () => {
  const authParams = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=client_credentials&client_id=${process.env.SPOTIFY_CLIENT_ID}&client_secret=${process.env.SPOTIFY_CLIENT_SECRET}`
  }

  const res = await fetch("https://accounts.spotify.com/api/token", authParams)
  const data = await res.json()
  return data.access_token
}

const getAlbum = async (id: string): Promise<Album> => {
  const accessToken = await getAccessToken()
  const res = await fetch(`https://api.spotify.com/v1/albums/${id}`, { 
    cache: 'force-cache', 
    method: "GET", 
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  })
  const data = await res.json()
  return data
}

export default async function AlbumData({ id }: { id: string }) {
  const album = await getAlbum(id)

  return (
    <div className="flex items-center flex-col space-y-5 md:space-y-0 md:flex-row md:space-x-10">
      <Image
        src={album.images[0].url}
        width={250}
        height={250}
        alt={album.name}
        className="rounded-md"
      />
      <div className="flex flex-col space-y-3">
        <h2 className="font-bold text-xl md:text-2xl">{album.name}</h2>
        <p className="text-sky-400">
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