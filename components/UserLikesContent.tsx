'use client'

import { getUser } from "@/app/serverMethods";
import { Like } from "@prisma/client";
import ReviewCard from "@/components/ReviewCard";
import { useQuery } from "@tanstack/react-query";
import { getReview } from "@/app/apiMethods";
import { useSession } from "next-auth/react"
import Alert from "./Alert";
import LoadingSpinner from "./LoadingSpinner";

export default function UserLikesContent({ id }: { id: string }) {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id)
  })

  const { data: session } = useSession()

  if (user && !isLoading) {
    return (
      <div className="flex flex-col space-y-3">
        <p className="font-medium">All Review Likes</p>  
        {
          user.likes.length != 0 ?
          <div className="flex flex-col space-y-8">
            {
              user.likes
              .sort((a: Like, b: Like) => {
                return (new Date(b.createdAt)).getTime() - (new Date(a.createdAt)).getTime()
              })
              .map((like: Like) => {
                return (
                  <Like key={like.userId + like.reviewId} reviewId={like.reviewId}/>
                )
              })
            }
          </div> : 
          <Alert message={`${user.id == session?.user.id ? "You" : user.name} has no likes.`}/>
        }  
      </div>
    )
  } else {
    return (
      <LoadingSpinner/>
    )
  }
}


function Like({ reviewId }: { reviewId: string }) {
  const { data: review } = useQuery({
    queryKey: ['review', reviewId],
    queryFn: () => getReview(reviewId)
  })

  if (review) {
    return (
      <ReviewCard name={true} key={review.id} review={review}/>
    )
  }
}         
