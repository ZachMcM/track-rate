import { formatName } from "@/app/apiMethods";
import { getAccessToken } from "@/app/serverMethods";
import { Artist, Track } from "@/app/types";
import MusicReviewButton from "@/components/MusicReviewButton";
import MusicStats from "@/components/music/MusicStats";
import ShareButton from "@/components/ShareButton";
import { Metadata, ResolvingMetadata } from "next"
import Image from "next/image";
import Link from "next/link";
import { BsSpotify } from "react-icons/bs";
import { uid } from "uid";
import MusicReviews from "@/components/music/MusicReviews";

export async function generateMetadata({ params }: { params: { id: string }, parent: ResolvingMetadata}): Promise<Metadata> {
  const track = await getTrack(params.id)
  return {
    title: track.name 
  }
}

async function getTrack(id: string): Promise<Track> {
  const accessToken = await getAccessToken()
  const res = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await res.json();
  return data;
}

export default async function Track({ params }: { params: { id: string } }) {
  const track = await getTrack(params.id)

  return (
    <div className="flex space-y-10 mx-5 my-10 md:m-16 flex-col">
      <div className="flex flex-col space-y-10 md:flex-row md:space-y-0 md:justify-between items-center">
        <div className="flex items-center space-x-6 md:space-x-8">
          <div 
            className="shrink-0 relative h-28 w-28 md:h-60 md:w-60 drop-shadow-lg"
          >
            <Image
              src={track.album.images && track.album.images[0].url}
              fill
              alt={track.album.name}
              className="rounded-lg drop-shadow-lg"
            />
          </div>
          <div className="flex flex-col md:space-y-1">
            <div 
              className="z-10 font-medium text-2xl md:text-4xl"
            >
              <p className="hidden md:block">{track.name}</p>
              <p className="md:hidden">{formatName(track.name, 25)}</p>
            </div>   
            <p className="md:text-xl text-zinc-500">{formatName(track.album.name, 40)}</p>       
            <div className="flex text-sky-400 flex-wrap text-sm md:text-base gap-2 z-10">
              {
                track.artists.map((artist: Artist, i: number) => {
                  return (
                    <Link key={uid(50)} className="hover:underline" href={`/artist/${artist.id}`}>
                      <p className="hover:opacity-80">{artist.name}{i != track.artists.length - 1 && ","} </p>
                    </Link>
                  )
                })
              }
            </div>
          </div>
        </div>
        <MusicStats 
          data={{
            trackId: track.id,
            trackName: track.name,
            albumImage: track.album.images[0].url,
            albumName: track.album.name,
            albumId: track.album.id,
            type: "track",
            
            artistIds: track.artists.map((artist: Artist) => { return artist.id }),
            artistImages: [],
            artistNames: track.artists.map((artist: Artist) => { return artist.name })
          }}
          id={track.id} 
          type="track"
        />
      </div>
      <div className="flex flex-col space-y-3">
        <p className="hidden md:block font-medium text-lg">Popular Reviews</p>
        <div className="flex flex-col-reverse md:space-y-0 md:flex-row md:space-x-14 items-start w-full">
          <div className="flex flex-col space-y-10 w-full mt-10 md:mt-0 basis-2/3">
            <div className="flex flex-col space-y-3">
              <p className="text-lg font-medium md:hidden">Popular Reviews</p>
              <div className="md:!mt-0">
                <MusicReviews id={track.id} type="track"/>
              </div>
            </div>
          </div>
          <div className="bg-white w-full flex flex-col font-medium items-center shadow-lg border border-zinc-200 rounded-lg basis-1/3">
            <a href={track.external_urls.spotify} className="hover:bg-zinc-100 duration-300 flex items-center space-x-2 py-2.5 px-5 border-b border-zinc-200 w-full justify-center">
              <BsSpotify className="text-lg text-green-400"/>
              <p>Listen on Spotify</p>
            </a>
            <ShareButton 
              className="flex items-center space-x-2 py-2.5 px-5 border-b border-zinc-200 w-full justify-center hover:bg-zinc-100 duration-300" 
              link={`/track/${track.id}`}
              type="track"
            />
            <MusicReviewButton 
              className="flex rounded-b-lg hover:bg-zinc-100 duration-300 items-center space-x-2 py-2.5 px-5 w-full justify-center"
              type="track"
              data={{
                trackId: track.id,
                trackName: track.name,
                albumImage: track.album.images[0].url,
                albumName: track.album.name,
                albumId: track.album.id,
                type: "track",
                
                artistIds: track.artists.map((artist: Artist) => { return artist.id }),
                artistImages: [],
                artistNames: track.artists.map((artist: Artist) => { return artist.name })
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}