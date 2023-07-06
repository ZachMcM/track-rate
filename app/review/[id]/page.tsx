import { getReview } from "@/app/serverMethods"
import Image from "next/image"
import Link from "next/link"
import { formatName } from "@/app/apiMethods"
import { uid } from "uid"
import ReviewPageClient from "@/components/review/ReviewPageClient"

export default async function Reivew({ params }: { params: { id: string }}) {
  const review = await getReview(params.id)

  return (
    <div className="flex space-y-10 mx-3 my-10 md:m-14 lg:mx-48 2xl:mx-96 flex-col">
      <div className="flex items-center space-x-4 md:space-x-8">
        <Link 
          className={`shrink-0 relative h-24 w-24 md:h-52 md:w-52 drop-shadow-md ${review.type == "artist" ? "rounded-full" : "rounded-lg"} hover:opacity-80 duration-300`}
          href={`${review.type == "artist" ? `/artist/${review.artistIds[0]}` : `/album/${review.albumId}`}`} 
        >
          <Image
            src={review.type == "artist" ? review.artistImages[0] : review.albumImage || ""}
            fill
            alt={review.type == "artist" ? review.artistNames[0] : review.albumName || ""}
            className={`${review.type == "artist" ? "rounded-full" : "rounded-lg"} drop-shadow-md`}
          />
        </Link>
        <div className="flex flex-col md:space-y-2">
          <Link 
            href={(review.type == "album" ? `/album/${review.albumId}` : review.type == "track" ? `/track/${review.trackId}` : `/artist/${review.artistIds[0]}`)} 
            className="z-10 font-medium text-lg md:text-2xl hover:opacity-70 duration-300"
          >
            <p className="hidden md:block">{review.type == "album" ? review.albumName : review.type == "track" ? review.trackName : review.artistNames[0]}</p>
            <p className="md:hidden">{formatName((review.type == "album" ? review.albumName : review.type == "track" ? review.trackName : review.artistNames[0]) || "", 25)}</p>
            </Link>          
          {
            review.type != "artist" &&
            <div className="flex flex-wrap text-sm md:text-base gap-2 text-sky-400 z-10">
            {
              review.artistNames.map((name: string, i: number) => {
                return (
                  <Link key={uid(50)} className="flex space-x-2 items-center duration-300 hover:underline" href={`/artist/${review.artistIds[i]}`}>{name}{i != review.artistNames.length - 1 && ","} </Link>
                )
              })
            }
            </div>
          }
        </div>
      </div>
      <ReviewPageClient id={params.id}/>
    </div>  
  )
}

