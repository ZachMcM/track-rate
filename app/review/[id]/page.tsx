import { Metadata, ResolvingMetadata } from "next"
import { getReview } from "@/app/serverMethods"
import ReviewPage from "@/components/review/ReviewPage"

export async function generateMetadata({ params }: { params: { id: string }, parent?: ResolvingMetadata}): Promise<Metadata> {
  const review = await getReview(params.id)
  return {
    title: `${review.user.name} review of ${review.type == "track" ? review.trackName : review.type == "album" ? review.albumName : review.artistNames[0]}`
  }
}

export default function Reivew({ params }: { params: { id: string }}) {
  return <ReviewPage id={params.id}/>
}

