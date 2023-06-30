'use client'

import { FullUser } from "@/app/types";
import Alert from "./Alert";
import { useSession } from "next-auth/react"
import ReviewCard from "./ReviewCard";
import { Review } from "@prisma/client";
import { useState } from "react";
import { TbSearch } from "react-icons/tb";

export default function ProfileReviewList({ user}: { user: FullUser }) {
  const { data: session } = useSession()

  const [reviews, setReviews] = useState<Review[]>(user.reviews)

  const updateSearch = (query: string) => {    
    console.log(query)
    if (query == "") {
      setReviews(user.reviews)
    } else {
      const filteredReviews = reviews.filter((review: Review) => {
        return review.itemName.toLowerCase().includes(query.toLowerCase()) || review.title.toLowerCase().includes(query.toLowerCase())
      })
      setReviews(filteredReviews)
    }
  }

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex flex-col space-y-3">
        <div className="flex flex-col">
          <p className="font-medium text-lg">Reviews</p>
          <p className="font-medium text-sm text-zinc-400">A list of all the reviews posted.</p>
        </div>
        <div className="flex space-x-2 items-center border-zinc-800 py-3 px-4 border rounded-md focus-within:ring-2 ring-zinc-800 text-sm font-medium">
          <TbSearch className="text-lg text-zinc-400"/>
          <input
            className="bg-transparent border-none outline-none placeholder:text-zinc-400"
            onChange={(e) => updateSearch(e.target.value)}
            placeholder="Search reviews..."
          />
        </div>
      </div>
    {
      user.reviews.length != 0 ?
      <div className="flex flex-col space-y-8">
        {
          reviews
          .sort((a: Review, b: Review) => {
            return (new Date(b.createdAt)).getTime() - (new Date(a.createdAt)).getTime()
          })
          .map((review: Review) => {
            return <ReviewCard name={false} key={review.id} review={review}/>
          })
        }
      </div> :
      <Alert message={`${user.id == session?.user.id ? "You have" : user.name + " has"} no reviews.`}/>
    }
    </div>
  )
}