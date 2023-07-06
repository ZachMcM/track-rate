'use client'

import { ExtendedComment, ExtendedReview } from "@/app/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { formatCompactNumber } from "@/app/apiMethods"
import { useState } from "react"
import { ReviewComment } from "@prisma/client"
import Comment from "./Comment"

export default function ReviewComments({ review }: { review: ExtendedReview }) {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const [error, setError] = useState<boolean>(false)
  const [content, setContent] = useState<string>('')

  const addMutation = useMutation({
    mutationFn: async (): Promise<ReviewComment> => {
      const res = await fetch(
        `/api/comment?reviewId=${review.id}&content=${content}`,
        {
          method: "POST",
        }
      );
      const data = await res.json();
      return data;
    },
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries({ queryKey: ['review', { id: review.id } ]})
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

  return (
    <div id="#comments" className="flex flex-col w-full space-y-10">
      <div className="flex flex-col space-y-3">
        <p className="font-medium text-lg ">
          {formatCompactNumber(review.comments.length)} Comment{review.comments.length != 1 && "s"}
        </p>
          {
          session && session.user &&
          <div className="w-full flex flex-col">
            <div className="flex flex-col space-y-5">
              <div className="flex flex-col space-y-1 w-full">
                <textarea
                    className={`h-40 border dark:border-zinc-800 border-zinc-200 dark:bg-zinc-900 overflow-y-auto placeholder:text-zinc-500 drop-shadow-md duration-300 bg-white w-full rounded-lg p-4 outline-none ${
                      error
                        ? "ring-2 ring-red-500"
                        : "focus:ring-1 ring-zinc-200 dark:ring-zinc-800"
                    }`}              
                    placeholder="Add a comment..."
                    value={content}
                    onChange={(e) => {
                      setError(false)
                      setContent(e.target.value)
                    }}
                />
                { error && <p className="text-xs text-red-500">Content required</p>}
              </div>
              <button
                className="flex items-center justify-center bg-sky-400 px-4 py-3.5 rounded-lg font-medium text-white hover:opacity-80 duration-300"
                onClick={submitComment}
              >
                
                { addMutation.isLoading ?                
                  <svg aria-hidden="true" className="w-6 h-6 text-sky-500 animate-spin fill-zinc-200" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg> :
                  <p>Add Comment</p>
                }
              </button>
            </div>
          </div>
        }
      </div>
      {
        review.comments.length != 0 &&
        <div className={`flex flex-col bg-white dark:bg-zinc-900 rounded-lg drop-shadow-md ${!session && "!mt-3"}`}>
          {
            review.comments.map((comment: ExtendedComment) => {
              return (
                <Comment key={comment.id} comment={comment}/>
              )
            })
          }
        </div>
      }
    </div>
  )
}