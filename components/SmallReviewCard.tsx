import { formatName, getAccessToken, getAlbum, getArtist, getTrack } from "@/app/apiMethods";
import { FullReview } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import RatingDisplay from "./RatingDisplay";

export default function SmallReview({ review }: { review: FullReview }) {
  return (
    <div className="bg-transparent flex flex-col items-center text-center space-y-2 md:space-y-3">
      <Link 
        href={`/review/${review.id}`} 
        className={`relative drop-shadow-lg h-20 w-20 md:h-44 md:w-44 ${review.type == "artist" ? "rounded-full" : "rounded-lg"} hover:ring-4 ring-sky-200 duration-300`}
      >
        <Image
          src={review.type == "artist" ? review.artistImages[0] : review.albumImage || ""}
          fill
          alt={review.type == "artist" ? review.artistNames[0] : review.albumName || ""}
          className={`${review.type == "artist" ? "rounded-full" : "rounded-lg"} drop-shadow-lg`}
          />
      </Link>
      <div className="flex flex-col space-y-1 items-center">
        <p className="font-medium text-sm md:text-base">{review.type == "album" ? formatName(review.albumName || "", 10) : review.type == "track" ? formatName(review.trackName || "", 10) : formatName(review.artistNames[0], 10)}</p>
        <div className="text-sm md:text-base"><RatingDisplay rating={review.rating}/></div>
      </div>
    </div>
  )
}
