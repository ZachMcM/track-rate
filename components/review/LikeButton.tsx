'use client'

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { TbHeart, TbHeartFilled } from "react-icons/tb"
import { formatCompactNumber } from "@/app/apiMethods"
import { usePathname } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { ExtendedReview } from "@/app/types"
import { Like } from "@prisma/client"

export default function LikeButton({ review }: { review: ExtendedReview }) {
  const { data: session, status } = useSession()

  const router = useRouter()
  const pathname = usePathname()
  const queryClient = useQueryClient()

  useEffect(() => {
    const getInitialLike = () => {
      if (session) {
        for (const like of review.likes) {
          if (like.userId == session.user.id) {
            setLiked(true)
            return
          }
        }
        setLiked(false)
      } else {
        setLiked(false)
      }
    }
    getInitialLike()
  }, [status])

  const [liked, setLiked] = useState<boolean>()
  const [likeCount, setLikeCount] = useState<number>(review.likes.length)

  const likeMutation = useMutation({
    mutationFn: async (): Promise<Like> => {
      const res = await fetch(`/api/likes?reviewId=${review.id}`, {
        method: "PATCH",
      });
      const data = await res.json();
      return data;
    },
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries({ queryKey: ['review', { id: review.id }]})
      queryClient.invalidateQueries({ queryKey: ['user-likes', { id: review.userId }]})
      queryClient.invalidateQueries({ queryKey: ['user-reviews', { id: review.userId }]})
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
    <div className="flex space-x-2 items-center justify-center">
      <button 
        className="duration-300 hover:opacity-70 text-xl"
        onClick={toggleLike}
      >
        {
          liked ? 
          <TbHeartFilled className="text-red-500"/> :
          <TbHeart/>
        }
      </button>
      <p>{formatCompactNumber(likeCount)} Like{likeCount != 1 && "s"}</p>
    </div>
  )
}