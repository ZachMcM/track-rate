'use client'

import { getUser } from "@/app/apiMethods"
import { FullReview } from "@/app/types"
import Alert from "@/components/Alert"
import LoadingSpinner from "@/components/LoadingSpinner"
import SmallReview from "@/components/SmallReviewCard"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import ProfileDashboard from "@/components/ProfileDashboard"
import ReviewCard from "./ReviewCard"

export default function ProfilePage({ id }: { id: string }) {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id)
  })
  
  const pinExists = () => {
    if (user) {
      for (const review of user.reviews) {
        if (review.pinned) {
          return true
        }
      }    
      return false  
    }
  }

  const isPinnedReview = pinExists()

  return (
    <>
      {
        user && !isLoading ?
        <div className="flex space-x-10 items-start">
          <div className="flex flex-col space-y-8 w-full md:w-4/5">   
            <div className="flex flex-col space-y-3">
              <p className="font-medium text-lg">Recent activity</p>
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
              <p className="font-medium text-lg">Pinned</p>
              {
                isPinnedReview ?
                <>
                  {
                    <div className="flex flex-col space-y-8">
                      {
                        user.reviews.map((review: FullReview) => {
                          return <ReviewCard review={review}/>
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
        </div> :
        <div className="p-10">
          <LoadingSpinner/>
        </div>
      }
    </>
  )
}
