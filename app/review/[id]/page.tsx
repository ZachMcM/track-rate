import { Metadata, ResolvingMetadata } from "next"
import { getReview } from "@/app/serverMethods"
import ReviewContent from "@/components/ReviewContent"

export async function generateMetadata({ params }: { params: { id: string }, parent?: ResolvingMetadata}): Promise<Metadata> {
  const review = await getReview(params.id)
  return {
    title: `${review.itemName} review`
  }
}

export default function ReviewPage({ params }: { params: { id: string }}) {
  return (
    <div className="md:p-5">
      <ReviewContent id={params.id}/>
    </div>
  )
}

