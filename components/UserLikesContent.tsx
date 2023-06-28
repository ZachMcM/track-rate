'use client'

import { getUser } from "@/app/serverMethods";
import { Like, Review, User } from "@prisma/client";
import ReviewCard from "@/components/ReviewCard";
import { useQuery } from "@tanstack/react-query";
import { getReview } from "@/app/apiMethods";
import { FullUser } from "@/app/types";
import Oops from "./Oops";

export default function UserLikesContent({ id }: { id: string }) {
  const { data: user } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id)
  })

  if (user) {
    return (
      <div className="flex flex-col space-y-3">
        <p className="font-medium text-lg">All Likes</p>  
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
          <Oops message="no likes" backUrl={`/profile/${user.id}`}/>
        }  
      </div>
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
