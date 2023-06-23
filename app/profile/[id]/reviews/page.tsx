'use client'

import { redirect } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { getUserData } from "@/app/apiMethods"
import { Review } from "@prisma/client"
import ReviewCard from "@/components/ReviewCard"

export default function ProfileReviews({ params }: { params: { id: string }}) {
  const userDataQuery = useQuery({ queryKey: ["user", params.id], queryFn: () => getUserData(params.id)})

  if (userDataQuery.isSuccess && userDataQuery.data == null) {
    return redirect("/")
  } else if (userDataQuery.isSuccess && userDataQuery != null) {
    return (
      <div className="flex flex-col space-y-5">
        <p className="font-semibold text-lg">{userDataQuery.data.reviews.length} Reviews</p>
        <div className="flex flex-col space-y-10 w-full">
          {
            userDataQuery.data.reviews.sort((a: Review, b: Review) => {
              return (
                (new Date(b.createdAt)).getTime() - (new Date(a.createdAt)).getTime()
              )
            }).map((review: Review) => {
              return <ReviewCard review={review} key={review.id}/>
            })
          }
        </div>
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}