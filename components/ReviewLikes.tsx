'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { TbHeart, TbHeartFilled } from "react-icons/tb"
import { FullReview } from "@/app/types"
import { formatCompactNumber, updateLike } from "@/app/apiMethods"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function ReviewLikes({ review, initialLike }: { review: FullReview, initialLike: boolean }) {
  const { data: session } = useSession()

  const router = useRouter()
  const pathname = usePathname()
  const queryClient = useQueryClient()

  const [liked, setLiked] = useState<boolean>(initialLike)
  const [likeCount, setLikeCount] = useState<number>(review.likes.length)

  const likeMutation = useMutation({
    mutationFn: () => updateLike(review.id),
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries({ queryKey: ['review', review.id]})
      queryClient.invalidateQueries({ queryKey: ['user', review.userId] })
    }
  })

  const toggleLike = () => {
    if (session) {
      if (liked) {
        setLiked(false)
        setLikeCount(likeCount - 1)
      } else {
        setLiked(true)
        setLikeCount(likeCount + 1)
      }
      likeMutation.mutate()
    } else {
      router.push(`/signin?callbackUrl=${pathname}`)
    }
  }

  return (
    <div className="flex space-x-2 items-center text-zinc-400 text-sm">
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
      <p>{formatCompactNumber(likeCount)} Like{likeCount != 1 && "s"}</p>
    </div>
  )
}