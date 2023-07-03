import { getUser } from "@/app/serverMethods";
import { FullReview } from "@/app/types";
import ReviewCard from "@/components/review/ReviewCard";

export default async function ProfilePinned({ params }: { params: { id: string }}) {
  const user = await getUser(params.id)

  const pinnedReviews = user.reviews.filter((review: FullReview) => {
    return review.pinned
  })

  return (
    <div className="flex flex-col space-y-3">
    <p className="font-medium text-lg">Pinned</p>
    {
      pinnedReviews.length != 0 ?
      <>
        {
          <div className="flex flex-col bg-white drop-shadow-lg rounded-lg">
            {
              pinnedReviews.map((review: FullReview) => {
                return <ReviewCard review={review}/>
              })
            }
          </div>
        }
      </> :
      <div className="flex px-5 py-10 bg-white rounded-md justify-center items-center drop-shadow-lg">
        <p className="text-zinc-500 text-sm">No pinned reviews</p>
      </div>
    }
  </div> 
  )
}