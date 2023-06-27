import { getAlbum, getTrack } from "@/app/serverMethods";
import { Artist } from "@/app/types";
import { Review } from "@prisma/client";
import Image from "next/image";
import RatingDisplay from "./RatingDisplay";

export default function ReviewCard({ review }: { review: Review }) {
  if (review.type == "album") {
    return <AlbumReviewCard review={review}/>
  } else {
    return <TrackReviewCard review={review}/>
  }
}

async function AlbumReviewCard({ review }: { review: Review }) {
  const album = await getAlbum(review.itemId)

  return (
    <a href={`/review/${review.id}`} className="flex space-x-8 items-center p-8 rounded-md border border-gray-700 hover:opacity-50 duration-300 bg-gray-950">
      <Image
        src={album.images[0].url}
        width={100}
        height={100}
        alt={album.name}
        className="rounded-md"
      />
      <div className="flex flex-col space-y-5">
        <div className="flex flex-col space-y-1">
          <p className="font-bold">{album.name} <span>({(new Date(album.release_date).getFullYear())})</span></p>
          <p className="text-sky-400 text-sm">
            {
              album.artists.map((artist: Artist) => {
                return <span key={artist.id}> {artist.name} </span>
              })
            }
          </p>
        </div>
        <RatingDisplay rating={review.rating}/>
        <p className="text-gray-400 font-medium">{review.content}</p>
      </div>
    </a>
  )
}

async function TrackReviewCard({ review }: { review: Review }) {
  const track = await getTrack(review.itemId)
  
  return (
    <a href={`/review/${review.id}`} className="flex space-x-8 items-center p-8 rounded-md border border-gray-700 hover:opacity-50 duration-300 bg-gray-950">
      <Image
        src={track.album.images[0].url}
        width={100}
        height={100}
        alt={track.name}
        className="rounded-md"
      />
      <div className="flex flex-col space-y-5">
        <div className="flex flex-col space-y-1">
          <p className="font-bold">{track.name}</p>
          <p className="text-gray-400 text-sm font-medium">{track.album.name}</p>
          <p className="text-sky-400 text-xs">
            {
              track.artists.map((artist: Artist) => {
                return <span key={artist.id}> {artist.name} </span>
              })
            }
          </p>
        </div>
        <RatingDisplay rating={review.rating}/>
        <p className="text-gray-400 font-medium">{review.content}</p>
      </div>
    </a>
  )
}