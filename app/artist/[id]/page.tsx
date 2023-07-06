import { getAccessToken } from "@/app/serverMethods";
import { Artist } from "@/app/types";
import MusicReviewButton from "@/components/music/MusicReviewButton";
import MusicStats from "@/components/music/MusicStats";
import ShareButton from "@/components/ShareButton";
import Image from "next/image";
import { BsSpotify } from "react-icons/bs";
import MusicReviews from "@/components/music/MusicReviews";

async function getArtist(id: string): Promise<Artist> {
  const accessToken = await getAccessToken()
  const res = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await res.json();
  return data;
}

export default async function Artist({ params }: { params: { id: string } }) {
  const artist = await getArtist(params.id)

  return (
    <div className="flex space-y-10 mx-5 my-10 md:m-16 flex-col">
      <div className="flex flex-col space-y-10 md:flex-row md:space-y-0 md:justify-between items-center">
        <div className="flex items-center space-x-6 md:space-x-8">
          <div 
            className="shrink-0 rounded-full relative h-28 w-28 md:h-60 md:w-60 drop-shadow-md"
          >
            <Image
              src={artist.images && artist.images[0].url}
              fill
              alt={artist.name}
              className="rounded-full drop-shadow-md"
            />
          </div>
          <p className="z-10 font-medium text-2xl md:text-4xl">{artist.name}</p>
        </div>
        <MusicStats 
          data={{
            artistIds: [artist.id],
            artistImages: [artist.images && artist.images[0].url],
            artistNames: [artist.name],
            type: "artist"
          }}
          id={artist.id} 
          type="artist"
        />
      </div>
      <div className="flex flex-col space-y-3">
        <p className="hidden md:block font-medium text-lg">Popular Reviews</p>
        <div className="flex flex-col-reverse md:space-y-0 md:flex-row md:space-x-14 items-start w-full">
          <div className="flex flex-col space-y-10 w-full mt-10 md:mt-0 basis-2/3">
            <div className="flex flex-col space-y-3">
              <p className="text-lg font-medium md:hidden">Popular Reviews</p>
              <div className="md:!mt-0">
                <MusicReviews id={artist.id} type="artist"/>
              </div>
            </div>
          </div>
          <div className="bg-white w-full flex flex-col font-medium items-center shadow-md dark:bg-zinc-900  rounded-lg basis-1/3">
            <a href={artist.external_urls.spotify} className="hover:bg-zinc-200 rounded-t-lg dark:hover:bg-zinc-800 dark:border-zinc-800 duration-300 flex items-center space-x-2 py-2.5 px-5 border-b border-zinc-200 w-full justify-center">
              <BsSpotify className="text-lg"/>
              <p>Listen on Spotify</p>
            </a>
            <ShareButton 
              className="flex items-center space-x-2 py-2.5 px-5 dark:hover:bg-zinc-800 dark:border-zinc-800 border-b border-zinc-200 w-full justify-center hover:bg-zinc-200 duration-300" 
              link={`/artist/${artist.id}`}
              type="artist"
            />
            <MusicReviewButton 
              className="flex rounded-b-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 dark:border-zinc-800 duration-300 items-center space-x-2 py-2.5 px-5 w-full justify-center"
              type="artist"
              data={{
                artistIds: [artist.id],
                artistImages: [artist.images[0].url],
                artistNames: [artist.name],
                type: "artist"
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}