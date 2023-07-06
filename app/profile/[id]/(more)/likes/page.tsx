'use client'

import { useQuery } from "@tanstack/react-query"
import { ExtendedLike } from "@/app/types"
import ReviewCard from "@/components/review/ReviewCard"
import LoadingSpinner from "@/components/LoadingSpinner"

export default function Likes({ params }: { params: { id: string } }) {
  
  const { data: user, isLoading } = useQuery({
    queryKey: ['user-likes', { id: params.id }],
    queryFn: async () => {
      const res = await fetch(`/api/user/likes?id=${params.id}`)
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
          <div className="flex flex-col rounded-lg drop-shadow-md dark:bg-zinc-900 bg-white">
            {
              user.likes
              .map((like: ExtendedLike) => {
                return (
                  <ReviewCard review={like.review}/>
                )
              })
            }
          </div> : 
          <div className="flex px-5 py-10 bg-white rounded-lg drop-shadow-md dark:bg-zinc-900 justify-center items-center basis-2/3">
            <p className="text-zinc-500 text-sm">No likes</p>
          </div>
        }
      </div>      
    )
  } else {
    return <LoadingSpinner/>
  }
}