'use client'

import { FullComment, FullReview } from "@/app/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { addComment, deleteComment, getComments } from "@/app/apiMethods"
import { useState } from "react"
import { TbTrash } from "react-icons/tb"
import DeleteModal from "./DeleteModal"

export default function ReviewComments({ review }: { review: FullReview }) {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const [error, setError] = useState<boolean>(false)
  const [content, setContent] = useState<string>('')

  const [deleteModal, setDeleteModal] = useState<boolean>(false)

  const comments = useQuery({ 
    queryKey: ['comments', review.id], 
    queryFn: () => getComments(review.id)
  })

  const addMutation = useMutation({
    mutationFn: () => addComment(review.id, content),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['comments', review.id]})
      setContent("")
    }
  }) 

  const submitComment = () => {
    if (content && content != "" && content != " ") {
      addMutation.mutate()
    } else {
      setError(true)
    }
  }

  const removeComment = async (id: string) => {
    const deletedComment = await deleteComment(id)
    console.log(deletedComment)
    queryClient.invalidateQueries({ queryKey: ['comments', review.id] })
  }

  const getTimeAgo = (createdAt: Date): string => {
    const posted = new Date(createdAt)
    const now = new Date()
    const daysAgo = Math.round((now.getTime() - posted.getTime()) / (86400 * 1000))
    const hoursAgo = Math.round((now.getTime() - posted.getTime()) / (3600 * 1000))
    const minutesAgo = Math.round((now.getTime() - posted.getTime()) / (60000))
    if (daysAgo == 0) {
      if (hoursAgo == 0) {
        return minutesAgo + " minutes ago"
      } else {
        return hoursAgo + " hours ago"
      }
    } else {
      return daysAgo + " days ago"
    }
  }

  return (
    <div className="flex flex-col space-y-10 text-zinc-400">
      <div className="flex flex-col space-y-8">
        { comments.data &&
          <p className="font-medium text-xs md:text-sm border-b border-zinc-700 pb-3">{comments.data.length} Comment{comments.data.length != 1 && "s"}</p>
        }
        <div className="flex flex-col space-y-8">
          {
            comments.data &&
            comments.data.map((comment: FullComment) => {
              return (
                <div key={comment.id} className="pb-8 flex flex-col space-y-5 border-b border-zinc-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Link className="hover:opacity-80 duration-300" href={`/profile/${comment.user.id}`}>
                        <Image
                          src={comment.user.image || ""}
                          width={30}
                          height={30}
                          alt="avatar"
                          className="rounded-full"
                        />
                      </Link>
                      <div className="flex flex-col">
                        <Link className="hover:opacity-80 duration-300" href={`/profile/${comment.user.id}`}>
                          <p className="text-xs md:text-sm font-bold">{comment.user.name}</p>
                        </Link>
                        <p className="text-xs font-medium">{getTimeAgo(comment.createdAt)}</p>
                      </div>
                    </div>
                    <p className="text-xs md:text-sm font-medium max-w-xl">
                      {comment.content}
                    </p>
                  </div>
                  {
                    comment.userId == session?.user.id &&
                    <>
                      <button 
                        className="text-zinc-400 flex items-center space-x-1 text-sm hover:opacity-80 duration-300"
                        onClick={() => setDeleteModal(true)}
                      >
                        <p>Delete</p>
                        <TbTrash className="text-lg"/>
                      </button>  
                      { 
                        deleteModal && 
                        <DeleteModal 
                          params={{
                            message: "Are you sure you want to delete this comment",
                            setModal: setDeleteModal,
                            confirmFunction: () => removeComment(comment.id)
                          }}
                        /> 
                      }                  
                    </>
                  }
                </div>
              )
            })
          }
        </div>
      </div>
      {
        session && session.user &&
        <div className="w-full flex flex-col">
          <div className="flex flex-col space-y-5 w-3/4 md:w-1/2 self-end">
            <div className="flex flex-col space-y-1">
              <textarea
                  className={`h-28 overflow-y-auto placeholder:text-zinc-400 text-xs md:text-sm bg-transparent border rounded-md p-4 outline-none ring-zinc-700 ring-offset-2 ring-offset-zinc-950 ${
                    error
                      ? "border-red-500 focus:ring-0"
                      : "border-zinc-700 focus:ring-2"
                  }`}              
                  placeholder="Your comment"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onFocus={() => setError(false)}
              />
              { error && <p className="text-xs text-red-500">Content required</p>}
            </div>
            <button
              className="text-white flex space-x-2 items-center text-xs md:text-sm w-fit self-end px-4 py-3 rounded-md font-semibold bg-sky-500 hover:bg-sky-400 duration-300"
              onClick={submitComment}
            >
              <p>Add Comment</p>
              { addMutation.isLoading &&                 
                <svg aria-hidden="true" className="w-5 h-5 mr-2 text-sky-300 animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
              }
            </button>
          </div>
        </div>
      }
    </div>
  )
}