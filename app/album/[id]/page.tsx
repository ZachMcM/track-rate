import { formatName } from "@/app/apiMethods";
import { getAccessToken } from "@/app/serverMethods";
import { Album, Artist, Props, SimplifiedTrack } from "@/app/types";
import MusicReviewButton from "@/components/music/MusicReviewButton";
import MusicStats from "@/components/music/MusicStats";
import ShareButton from "@/components/ShareButton";
import Image from "next/image";
import Link from "next/link";
import { BsSpotify } from "react-icons/bs";
import { uid } from "uid";
import MusicReviews from "@/components/music/MusicReviews";

async function getAlbum(id: string): Promise<Album> {
  const accessToken = await getAccessToken()
  const res = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await res.json();
  return data;
}

export default async function Album({ params }: { params: { id: string } }) {
  const album = await getAlbum(params.id)

  return (
    <div className="flex space-y-10 mx-3 my-10 md:m-14 lg:mx-48 2xl:mx-96 flex-col">
      <div className="flex flex-col space-y-10 md:flex-row md:space-y-0 md:justify-between items-center">
        <div className="flex items-center space-x-6 md:space-x-8">
          <div 
            className="shrink-0 relative h-28 w-28 md:h-60 md:w-60 drop-shadow-md"
          >
            <Image
              src={album.images && album.images[0].url}
              fill
              alt={album.name}
              className="rounded-lg drop-shadow-md"
            />
          </div>
          <div className="flex flex-col md:space-y-2">
            <div 
              className="z-10 font-medium text-2xl md:text-4xl"
            >
              <p className="hidden md:block">{album.name}</p>
              <p className="md:hidden">{formatName(album.name, 25)}</p>
             </div>          
             <div className="flex flex-wrap md:text-lg gap-2 text-sky-400 z-10">
              {
                album.artists.map((artist: Artist, i: number) => {
                  return (
                    <Link key={uid(50)} className="hover:underline" href={`/artist/${artist.id}`}>
                      <p>{artist.name}{i != album.artists.length - 1 && ","} </p>
                    </Link>
                  )
                })
              }
              </div>
          </div>
        </div>
        <MusicStats 
          data={{
            albumId: album.id,
            albumImage: album.images[0].url,
            albumName: album.name,
            type: "album",
            
            artistIds: album.artists.map((artist: Artist) => { return artist.id }),
            artistImages: [],
            artistNames: album.artists.map((artist: Artist) => { return artist.name })
          }}
          id={album.id} 
          type="album"
        />
      </div>
      <div className="flex flex-col space-y-3">
        <p className="hidden md:block font-medium text-lg">Tracklist</p>
        <div className="flex flex-col-reverse md:space-y-0 md:flex-row md:space-x-14 items-start w-full">
          <div className="flex flex-col space-y-10 w-full mt-10 md:mt-0 basis-2/3">
            <div className="flex flex-col space-y-3">
              <p className="text-lg font-medium md:hidden">Tracklist</p>
              <div className="flex h-64 md:!mt-0 overflow-y-auto flex-col text-zinc-500 text-sm dark:bg-zinc-900 bg-white drop-shadow-md rounded-lg p-2">
                {
                  album.tracks.items.map((track: SimplifiedTrack, i: number) => {
                    return <Link className="p-3 dark:hover:bg-zinc-800 hover:bg-zinc-100 rounded-lg duration-300" href={`/track/${track.id}`}><span className="mr-2">{i + 1}</span>{track.name}</Link>
                  })
                }
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <p className="text-lg font-medium">Popular Reviews</p>
              <MusicReviews id={album.id} type="album"/>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 w-full flex flex-col font-medium items-center shadow-md rounded-lg basis-1/3">
            <a href={album.external_urls.spotify} className="hover:bg-zinc-200 duration-300 rounded-t-lg flex items-center space-x-2 py-2.5 px-5 border-b dark:border-zinc-800 dark:hover:bg-zinc-800 border-zinc-200 w-full justify-center">
              <BsSpotify className="text-lg"/>
              <p>Listen on Spotify</p>
            </a>
            <ShareButton 
              className="flex items-center space-x-2 py-2.5 px-5 dark:border-zinc-800 dark:hover:bg-zinc-800 border-b border-zinc-200 w-full justify-center hover:bg-zinc-200 duration-300" 
              link={`/album/${album.id}`}
              type="album"
            />
            <MusicReviewButton 
              className="flex rounded-b-lg hover:bg-zinc-200 dark:border-zinc-800 dark:hover:bg-zinc-800 duration-300 items-center space-x-2 py-2.5 px-5 w-full justify-center"
              type="album"
              data={{
                albumId: album.id,
                albumImage: album.images[0].url,
                albumName: album.name,
                type: "album",
                artistIds: album.artists.map((artist: Artist) => { return artist.id }),
                artistImages: [],
                artistNames: album.artists.map((artist: Artist) => { return artist.name })
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}