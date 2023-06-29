'use client'

import { deleteComment, getComment } from "@/app/apiMethods"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { TbTrash } from "react-icons/tb"
import DeleteModal from "./DeleteModal"

export default function Comment({ commentId, reviewId }: { commentId: string, reviewId: string }) {
  const { data: session } = useSession()

  const queryClient = useQueryClient()

  const { data: comment, isLoading } = useQuery({
    queryKey: ['comment', commentId],
    queryFn: () => getComment(commentId)
  })

  const deleteCommentMutation = useMutation({
    mutationFn: () => deleteComment(commentId),
    onSuccess: (data) => {
      setDeleteModal(false)
      console.log(data)
      queryClient.invalidateQueries({ queryKey: ['review', reviewId]})
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

  const [deleteModal, setDeleteModal] = useState<boolean>(false)

  if (comment && !isLoading) {
    return (
      <div key={comment.id} className="flex items-center justify-between">
        <div className="flex space-x-3">
          <Link className="hover:opacity-80 duration-300" href={`/profile/${comment.userId}`}>
            <Image
              src={comment.user.image || ""}
              width={40}
              height={40}
              alt="avatar"
              className="rounded-full p-1 border border-zinc-800"
            />
          </Link>
          <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-2">
              <Link className="hover:opacity-80 duration-300 font-bold text-sm text-white" href={`/profile/${comment.userId}`}>{comment.user.name}</Link>
              <p className="text-zinc-400 text-sm">{getTimeAgo()}</p>
            </div>
            <p className="font-medium text-sm">{comment.content}</p>
          </div> 
        </div>
        {
          comment.userId == session?.user.id &&
          <>
            <button 
              className="text-zinc-400 flex items-center space-x-2 text-sm hover:opacity-80 duration-300"
              onClick={() => setDeleteModal(true)}
            >
              <p>Delete</p>
              <TbTrash className="text-lg"/>
            </button>  
            { 
              deleteModal && 
              <DeleteModal deleteMutation={deleteCommentMutation} setModal={setDeleteModal}/> 
            }                  
          </>
        }
      </div>      
    )
  }
}