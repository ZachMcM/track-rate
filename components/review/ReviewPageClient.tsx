'use client'

import { useMutation, useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import RatingDisplay from "./RatingDisplay"
import LikeButton from "./LikeButton"
import { useState } from "react"
import { ExtendedReview } from "@/app/types"
import { useSession } from "next-auth/react"
import { TbTrash } from "react-icons/tb"
import { useQueryClient } from "@tanstack/react-query"
import DeleteModal from "../DeleteModal"
import { useRouter } from "next/navigation"
import ReviewComments from "./ReviewComments"
import MusicReviewButton from "../music/MusicReviewButton"
import ShareButton from "../ShareButton"
import LoadingSpinner from "../LoadingSpinner"

export default function ReviewPageClient({ id }: { id: string }) {
  const { data: review, isLoading } = useQuery({
    queryKey: ['review', { id: id } ],
    queryFn: async (): Promise<ExtendedReview> => {
      const res = await fetch(`/api/review?id=${id}`);
      const data = await res.json();
      return data;
    }
  })

  const queryClient = useQueryClient()
  const router = useRouter()

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/review?id=${id}`, {
        method: "DELETE"
      })
      const data = await res.json()
      return data
    },
    onSuccess: (data) => {
      console.log(data)
      const musicId = review?.type == "track" ? review.trackId : review?.type == "album" ? review.albumId : review?.artistIds[0]
      queryClient.invalidateQueries({ queryKey: ["music-reviews", { id: musicId }]})
      queryClient.invalidateQueries({ queryKey: ["music-rating", { id: musicId }]})
      queryClient.invalidateQueries({ queryKey: ['user', { id: review?.userId }]})
      queryClient.invalidateQueries({ queryKey: ['user-reviews', { id: review?.userId }]})
      if (review && review.likes.length != 0) {
        for (const like of review?.likes) {
          queryClient.invalidateQueries({ queryKey: ['user-likes', { id: like.userId }]})
        }
      }
      router.push("/")
    }
  })

  const { data: session } = useSession()
  
  const [deleteModal, setDeleteModal] = useState<boolean>(false)

  if (review && !isLoading) {
    return (
      <>
        <div className="flex flex-col-reverse md:flex-row md:space-y-0 md:space-x-14 items-start">
          <div className="flex flex-col space-y-14 w-full basis-2/3 mt-10 md:mt-0">
            <div className="space-y-8 flex flex-col">
              <div className="flex space-x-3 items-center">
                <Link href={`/profile/${review.userId}`} className="h-10 w-10 drop-shadow-md relative hover:opacity-80 duration-300 rounded-full">
                  <Image
                    src={review.user?.image || ""}
                    fill
                    alt="avatar"
                    className="rounded-full drop-shadow-md"
                  />
                </Link>
                <Link href={`/profile/${review.userId}`}><p className="hover:opacity-70 duration-300 font-medium text-lg">{review.user.name}</p></Link>
              </div>
              <div className="text-xl"><RatingDisplay rating={review.rating}/></div>
              <p className="whitespace-pre-wrap">{review.content}</p>
            </div>
            <ReviewComments review={review}/>
          </div>
          <div className="bg-white w-full dark:bg-zinc-900 flex flex-col font-medium items-center shadow-md rounded-lg basis-1/3">
            <div className="py-2.5 px-5 border-b dark:border-zinc-800 border-zinc-200 w-full flex justify-center"><LikeButton review={review}/></div>
            <ShareButton
              className={`py-2.5 px-5 border-zinc-200 w-full dark:border-zinc-800 dark:hover:bg-zinc-800 hover:bg-zinc-200 duration-300 justify-center flex ${session ? "border-b" : "rounded-b-lg"}`}
              link={`/review/${review.id}`}
              type="review"
            />
            {
              session &&
              <MusicReviewButton 
                type={review.type} 
                data={{
                  type: review.type as "album" | "track" | "artist",

                  trackName: review.trackName || undefined,
                  trackId: review.trackId || undefined,
                
                  artistNames: review.artistNames,
                  artistIds: review.artistIds,
                  artistImages: review.artistImages,
                
                  albumName: review.albumName || undefined,
                  albumId: review.albumId || undefined,
                  albumImage: review.albumImage || undefined
                }}
                className={`py-2.5 px-5 w-full capitalize dark:border-zinc-800 dark:hover:bg-zinc-800 last:rounded-b-lg hover:bg-zinc-200 duration-300 ${session && session.user.id == review.userId ? "border-b" : "rounded-b-lg"} border-zinc-200`}
              />
            }
            {
              session && session.user.id == review.userId &&
              <>
                <button
                  className="flex items-center last:rounded-b-lg dark:border-zinc-800 dark:hover:bg-zinc-800 justify-center space-x-2 py-2.5 px-5 w-full capitalize hover:bg-zinc-200 duration-300"
                  onClick={() => setDeleteModal(true)}
                >
                  <TbTrash className="text-xl"/>
                  <p>Delete Review</p>
                </button>
              </>
            }
          </div>
        </div>
        { deleteModal && <DeleteModal confirm={() => deleteMutation.mutate()} setModal={setDeleteModal} type="review" isLoading={deleteMutation.isLoading}/>}
      </>  
    )  
  } else {
    return <LoadingSpinner/>
  }
}