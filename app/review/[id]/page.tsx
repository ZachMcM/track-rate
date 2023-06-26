import RatingDisplay from "@/components/RatingDisplay"
import { Metadata, ResolvingMetadata } from "next"
import Link from "next/link"
import ReviewLikes from "@/components/ReviewLikes"
import AlbumData from "@/components/AlbumData"
import ReviewComments from "@/components/ReviewComments"
import TrackData from "@/components/TrackData"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getReview } from "@/app/serverMethods"
import { Suspense } from "react"
import DataSkeleton from "@/components/DataSkeleton"

export async function generateMetadata({ params }: { params: { id: string }, parent?: ResolvingMetadata}): Promise<Metadata> {
  const review = await getReview(params.id)
  return {
    title: review.item[0] + " Review - " + review.user.name
  }
}

export default function ReviewPage({ params }: { params: { id: string }}) {
  return (
    <div>
      <Suspense fallback={<DataSkeleton/>}>
        <ReviewContent id={params.id}/>
      </Suspense>
    </div>

  )
}

async function ReviewContent({ id }: { id: string }) {
  const review = await getReview(id)
  const session = await getServerSession(authOptions)

  const initialLike = () => {
    if (session.user) {
      for (const like of review.likes) {
        if (session.user.id == like.userId) {
          return true
        }
      }
      return false
    }
    return false
  }

  return (
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
            review.type == "album" &&
            <p className="text-sky-400">Favorite Track: <Link className="font-bold hover:opacity-80 duration-300" href={`/track/${review.favoriteTrack[1]}`}>{review.favoriteTrack[0]}</Link></p>
          }
          <p className="font-medium text-gray-400">{review.content}</p>
          <ReviewLikes review={review} initialLike={initialLike()}/>
        </div>
        <ReviewComments review={review}/>
      </div>
    </div>
  )
}

