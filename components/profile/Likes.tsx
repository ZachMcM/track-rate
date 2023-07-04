'use client'

import { useQuery } from "@tanstack/react-query"
import ReviewCard from "../review/ReviewCard"
import { ExtendeLike } from "@/app/types"
import LoadingSpinner from "../LoadingSpinner"

export default function Likes({ id }: { id: string }) {
  
  const { data: user, isLoading } = useQuery({
    queryKey: ['user-likes', { id: id }],
    queryFn: async () => {
      const res = await fetch(`/api/user/likes?id=${id}`)
      const data = await res.json()
      return data
    }
  })

  if (user && !isLoading) {
    return (
      <div className="flex flex-col space-y-3">
        <p className="font-medium text-lg">Likes</p>  
        {
          user.likes.length != 0 ?
          <div className="flex flex-col bg-white drop-shadow-lg border-zinc-200 border rounded-lg">
            {
              user.likes
              .map((like: ExtendeLike) => {
                return (
                  <ReviewCard review={like.review}/>
                )
              })
            }
          </div> : 
          <div className="flex px-5 py-10 bg-white rounded-lg drop-shadow-lg border border-zinc-200 justify-center items-center">
            <p className="text-zinc-500 text-sm">No likes</p>
          </div>
        }
      </div>      
    )
  } else {
    return <LoadingSpinner/>
  }
}