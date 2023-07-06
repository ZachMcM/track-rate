'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { TbTrash } from "react-icons/tb"
import { ExtendedComment } from "@/app/types"
import { ReviewComment } from "@prisma/client"

export default function Comment({ comment }: { comment: ExtendedComment}) {
  const { data: session } = useSession()

  const queryClient = useQueryClient()

  const deleteCommentMutation = useMutation({
    mutationFn: async (): Promise<ReviewComment> => {
      const res = await fetch(`/api/comment?id=${comment.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      return data;
    },
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries({ queryKey: ['review', { id: comment.reviewId }]})
      
    }
  })


  const getTimeAgo = (): string => {
    const posted = new Date(comment?.createdAt || "")
    const now = new Date()
    const daysAgo = Math.round((now.getTime() - posted.getTime()) / (86400 * 1000))
    const hoursAgo = Math.round((now.getTime() - posted.getTime()) / (3600 * 1000))
    const minutesAgo = Math.round((now.getTime() - posted.getTime()) / (60000))
    if (daysAgo == 0) {
      if (hoursAgo == 0) {
        return minutesAgo + "m"
      } else {
        return hoursAgo + "h"
      }
    } else {
      return daysAgo + "d"
    }
  }

  return (
    <div className="last:border-none flex items-center justify-between border-b dark:border-zinc-800 border-zinc-200 p-5">
      <div className="flex space-x-3">
        <Link className="hover:opacity-80 relative h-8 w-8 rounded-full duration-300" href={`/profile/${comment.userId}`}>
          <Image
            src={comment.user.image || ""}
            fill
            alt="avatar"
            className="rounded-full"
          />
        </Link>
        <div className="flex flex-col space-y-1">
          <div className="flex items-center space-x-2">
            <Link className="hover:opacity-70 duration-300 font-medium text-sm" href={`/profile/${comment.userId}`}>{comment.user.name}</Link>
            <p className="text-zinc-500 text-sm">{getTimeAgo()}</p>
          </div>
          <p className="text-sm text-zinc-500">{comment.content}</p>
        </div> 
      </div>
      {
        comment.userId == session?.user.id &&
        <>
          <button 
            className="text-sm hover:opacity-80 duration-300"
            onClick={() => deleteCommentMutation.mutate()}
          >
            <TbTrash className="text-lg"/>
          </button>                  
        </>
      }
    </div>      
  )
}