
import RatingDisplay from "@/components/RatingDisplay"
import { Metadata, ResolvingMetadata } from "next"
import Link from "next/link"
import { FullReview } from "@/app/apiTypes"
import ReviewLikes from "@/components/ReviewLikes"
import AlbumData from "@/components/AlbumData"
import ReviewComments from "@/components/ReviewComments"
import TrackData from "@/components/TrackData"

const getReview = async (id: string): Promise<FullReview> => {
  const res = await fetch(`${process.env.URL}/api/review?id=${id}`, { next: { tags: [`review${id}`]}})
  const data = await res.json()
  return data
}

export async function generateMetadata({ params }: { params: { id: string }, parent?: ResolvingMetadata}): Promise<Metadata> {
  const review = await getReview(params.id)
  return {
    title: review.item[0] + " - " + review.user.name
  }
}

export default async function ReviewPage({ params }: { params: { id: string }}) {
  const review = await getReview(params.id)

  return (
    <div className="p-8 md:py-16 lg:px-36">
      <div className="flex flex-col space-y-10">
        {
          review.type == "album" ?
          <AlbumData id={review.item[1]}/> :
          <TrackData id={review.item[1]}/>
        }
        <div className="w-full flex flex-col space-y-14">
          <div className="flex flex-col space-y-5 w-full">
            <p className="text-gray-400 text-sm">Review by: <Link className="font-bold hover:opacity-80 duration-300" href={`/profile/${review.userId}`}>{review.user.name}</Link></p>
            <div className="flex space-x-3">
              <h3 className="font-semibold text-xl">{review.title}</h3>
              <RatingDisplay rating={review.rating}/>
            </div>
            {
              review.favoriteTrack &&
              <p className="text-sky-400">Favorite Track: <Link className="font-bold hover:opacity-80 duration-300" href={`/track/${review.favoriteTrack[1]}`}>{review.favoriteTrack[0]}</Link></p>
            }
            <p className="font-medium text-gray-400">{review.content}</p>
            <ReviewLikes review={review}/>
          </div>
          <ReviewComments review={review}/>
        </div>
      </div>
    </div>
  )
}

