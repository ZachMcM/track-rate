import { getUser } from "@/app/serverMethods"
import { Metadata, ResolvingMetadata } from "next"
import { FullReview } from "@/app/types"
import SmallReview from "@/components/review/SmallReviewCard"
import ReviewCard from "@/components/review/ReviewCard"
import { TbChevronRight } from "react-icons/tb"
import Link from "next/link"

export async function generateMetadata({ params }: { params: { id: string }, parent?: ResolvingMetadata}): Promise<Metadata> {
  const user = await getUser(params.id)
  return {
    title: `${user.name}'s profile`
  }
}

export default async function Profile({ params }: { params: { id: string } }) {
  const user = await getUser(params.id)

  const pinnedReviews = user.reviews.filter((review: FullReview) => {
    return review.pinned
  })

  return (
    <div className="flex space-x-10 items-start">
      <div className="flex flex-col space-y-8 md:basis-3/4">   
        <div className="flex flex-col space-y-3">
          <Link href={`/profile/${user.id}/activity`} className="flex items-center justify-between hover:text-sky-400 duration-300">
            <p className="font-medium text-lg">Recent activity</p>
            <TbChevronRight className="text-xl"/>
          </Link>
          {
            user.reviews.length != 0 ?
            <div className="flex justify-around md:space-x-10 p-5 bg-white rounded-md drop-shadow-lg">
              {
                user.reviews.slice(0, 3)
                .map((review: FullReview) => {
                  return <SmallReview key={review.id} review={review}/>
                })
              }
            </div> :
            <div className="flex px-5 py-10 bg-white rounded-md justify-center items-center drop-shadow-lg">
              <p className="text-zinc-400 text-sm">No recent content</p>
            </div>
          }
        </div>
        <div className="flex flex-col space-y-3">
        <Link href={`/profile/${user.id}/pinned`} className="flex items-center justify-between hover:text-sky-400 duration-300">
            <p className="font-medium text-lg">Pinned</p>
            <TbChevronRight className="text-xl"/>
          </Link>
          {
            pinnedReviews.length != 0 ?
            <>
              {
                <div className="flex flex-col rounded-lg drop-shadow-md bg-white">
                  {
                    pinnedReviews.map((review: FullReview) => {
                      return <ReviewCard key={review.id} review={review}/>
                    })
                  }
                </div>
              }
            </> :
            <div className="flex px-5 py-10 bg-white rounded-md justify-center items-center drop-shadow-lg">
              <p className="text-zinc-400 text-sm">No pinned reviews</p>
            </div>
          }
        </div>        
      </div>
    </div> 
  )
}

