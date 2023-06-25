'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { TbHeart, TbHeartFilled } from "react-icons/tb"
import { FullReview } from "@/app/apiTypes"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getLikes, updateLike } from "@/app/apiMethods"

export default function ReviewLikes({ review }: { review: FullReview }) {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const likes = useQuery({ 
    queryKey: ['likes', review.id] ,
    queryFn: () => getLikes(review.id),
    initialData: review.likes
  })

  const didUserLike = (): boolean => {
    if (session) {
      for (const like of likes.data) {
        if (like.userId == session.user.id) {
          return true
        } 
      }     
      return false 
    } else {
      return false
    }
  }

  const toggleLike = async () => {
    if (session) {
      const like = await updateLike(review.id)
      queryClient.invalidateQueries({ queryKey: ['likes', review.id]})
      return like
    }
  }

  return (
    <div className="flex space-x-2 items-center text-gray-400 text-sm">
      <button 
        className={`text-xl duration-300 ${session && "hover:opacity-80 "}`}
        onClick={toggleLike}
      >
        {
          didUserLike() ?
          <TbHeartFilled/> :
          <TbHeart/>
        }
      </button>
      <p>{likes.data.length} Like{likes.data.length != 1 && "s"}</p>
    </div>
  )
}