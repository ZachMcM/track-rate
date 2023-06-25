'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { TbHeart, TbHeartFilled } from "react-icons/tb"
import { FullReview } from "@/app/types"
import { updateLike } from "@/app/apiMethods"
import ErrorModal from "./ErrorModal"

export default function ReviewLikes({ review, initialLike }: { review: FullReview, initialLike: boolean }) {
  const { data: session } = useSession()

  const [liked, setLiked] = useState<boolean>(initialLike)
  const [likeCount, setLikeCount] = useState<number>(review.likes.length)

  const [error, setError] = useState<boolean>(false)

  const toggleLike = async () => {
    if (session) {
      if (liked) {
        setLiked(false)
        setLikeCount(likeCount - 1)
      } else {
        setLiked(true)
        setLikeCount(likeCount + 1)
      }
      const like = await updateLike(review.id)
      console.log(like)
    }
  }

  return (
    <div className="flex space-x-2 items-center text-gray-400 text-sm">
      <button 
        className={`text-xl duration-300 ${session && "hover:opacity-80 "}`}
        onClick={toggleLike}
      >
        {
          liked ?
          <TbHeartFilled/> :
          <TbHeart/>
        }
      </button>
      <p>{likeCount} Like{likeCount != 1 && "s"}</p>
      { error && 
        <ErrorModal 
          setModal={setError} 
          message="You can't like posts, you aren't logged in"
          redirectLink={`/signin?callbackUrl=review/${review.id}`}
          redirectMessage="Sign in"
        />
      }
    </div>
  )
}