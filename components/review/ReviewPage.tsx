'use client'

import { formatName } from "@/app/apiMethods"
import { useMutation, useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import { uid } from "uid"
import RatingDisplay from "../RatingDisplay"
import LikeButton from "./LikeButton"
import { useContext, useState } from "react"
import Toast from "../Toast"
import { ReviewFormContext } from "../Provider"
import { ExtendedReview, ReviewFormProviderType } from "@/app/types"
import { useSession } from "next-auth/react"
import { TbTrash } from "react-icons/tb"
import { useQueryClient } from "@tanstack/react-query"
import DeleteModal from "../DeleteModal"
import { redirect, useRouter } from "next/navigation"

export default function ReviewPage({ id }: { id: string }) {
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

  const [shareToast, setShareToast] = useState<boolean>(false)

  const [deleteModal, setDeleteModal] = useState<boolean>(false)

  const {
    setItemData,
    setReviewForm
  } = useContext(ReviewFormContext) as ReviewFormProviderType

  if (review && !isLoading) {
    const shareReview =  async () => {
      try {
        await navigator.share({
          title: `trackrate review`,
          text: `${review.user.name} review of ${review.type == "track" ? review.trackName : review.type == "album" ? review.albumName : review.artistNames[0]}`,
          url: `trackrate.app/review/${review.id}`
        })
      } catch (e) {
        console.log(e)
        try {
          await navigator.clipboard.writeText(`Look at ${review.user.name}'s review of ${review.type == "track" ? review.trackName : review.type == "album" ? review.albumName : review.artistNames[0]} at trackrate.app/review/${review.id}`)
          setShareToast(true)
        } catch (e) {
          console.log(e)
        }
      }
    }

    return (
      <div className="flex space-y-10 mx-5 my-10 md:m-16 flex-col">
        <div className="flex items-center space-x-4 md:space-x-8">
          <Link 
            className={`shrink-0 relative h-24 w-24 md:h-52 md:w-52 drop-shadow-lg ${review.type == "artist" ? "rounded-full" : "rounded-lg"} hover:ring-4 ring-sky-200 duration-300`}
            href={`/review/${review.type == "artist" ? review.artistIds[0] : review.albumId}`} 
          >
            <Image
              src={review.type == "artist" ? review.artistImages[0] : review.albumImage || ""}
              fill
              alt={review.type == "artist" ? review.artistNames[0] : review.albumName || ""}
              className={`${review.type == "artist" ? "rounded-full" : "rounded-lg"} drop-shadow-lg`}
            />
          </Link>
          <div className="flex flex-col md:space-y-2">
            <Link 
              href={(review.type == "album" ? review.albumId : review.type == "track" ? review.trackId : review.artistIds[0]) || "/"} 
              className="z-10 font-medium text-lg md:text-2xl hover:text-sky-400 duration-300"
            >
              <p className="hidden md:block">{review.type == "album" ? review.albumName : review.type == "track" ? review.trackName : review.artistNames[0]}</p>
              <p className="md:hidden">{formatName((review.type == "album" ? review.albumName : review.type == "track" ? review.trackName : review.artistNames[0]) || "", 25)}</p>
             </Link>          
            {
              review.type != "artist" &&
              <div className="flex flex-wrap text-sm md:text-base gap-2 text-zinc-500 z-10">
              {
                review.artistNames.map((name: string, i: number) => {
                  return (
                    <Link key={uid(50)} className="flex space-x-2 items-center" href={`/artist/${review.artistIds[i]}`}>{name}{i != review.artistNames.length - 1 && ","} </Link>
                  )
                })
              }
              </div>
            }
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row md:space-y-0 md:space-x-14 items-start">
          <div className="flex flex-col space-y-8 basis-2/3 mt-10 md:mt-0">
            <div className="flex space-x-3 items-center">
              <Link href={`/profile/${review.userId}`} className="h-10 w-10 drop-shadow-lg  relative hover:ring-4 ring-sky-200 duration-300 rounded-full">
                <Image
                  src={review.user?.image || ""}
                  fill
                  alt="avatar"
                  className="rounded-full drop-shadow-lg "
                />
              </Link>
              <Link href={`/profile/${review.userId}`}><p className="hover:text-sky-400 duration-300 font-medium text-lg">{review.user.name}</p></Link>
            </div>
            <div className="text-xl"><RatingDisplay rating={review.rating}/></div>
            <p className="text-zinc-700 whitespace-pre-wrap">{review.content}</p>
          </div>
          <div className="bg-white w-full flex flex-col font-medium items-center drop-shadow-lg border border-zinc-200 rounded-lg basis-1/3">
            <div className="py-2.5 px-5 border-b border-zinc-200 w-full flex justify-center"><LikeButton review={review}/></div>
            <button 
              className="py-2.5 px-5 border-b border-zinc-200 w-full hover:bg-zinc-100 duration-300"
              onClick={() => shareReview()}
            >
              Share Reivew
            </button>
            <button 
              className="py-2.5 px-5 w-full capitalize hover:bg-zinc-100 duration-300 border-b border-zinc-200"
              onClick={() => {
                setItemData({
                  type: review.type as "album" | "track" | "artist",

                  trackName: review.trackName || undefined,
                  trackId: review.trackId || undefined,
                
                  artistNames: review.artistNames,
                  artistIds: review.artistIds,
                  artistImages: review.artistImages,
                
                  albumName: review.albumName || undefined,
                  albumId: review.albumId || undefined,
                  albumImage: review.albumImage || undefined
                })
                setReviewForm(true)
              }}
            >
              Rate This {review.type}
            </button>
            {
              session && session.user.id == review.userId &&
              <>
                <button
                  className="flex items-center justify-center space-x-2 py-2.5 px-5 w-full capitalize hover:bg-zinc-100 duration-300"
                  onClick={() => setDeleteModal(true)}
                >
                  <TbTrash className="text-xl"/>
                  <p>Delete Review</p>
                </button>
              </>
            }
          </div>
        </div>
        <Toast setToast={setShareToast} toast={shareToast}>Copied to clipboard</Toast>
        { deleteModal && <DeleteModal confirm={() => deleteMutation.mutate()} setModal={setDeleteModal} type="review" isLoading={deleteMutation.isLoading}/>}
      </div>  
    )  
  } else {
    return (
      <div className="mx-5 my-10 md:m-16">
        <div className="flex items-center space-x-4 md:space-x-8">
          <div className="shrink-0 relative h-24 w-24 md:h-52 md:w-52 rounded-lg drop-shadow-lg bg-zinc-300 animate-pulse"></div>
          <div className="flex flex-col space-y-3">
            <div className="bg-zinc-300 h-3 md:h-6 rounded-sm md:rounded-md drop-shadow-lg animate-pulse w-40 md:w-96"></div>
            <div className="bg-zinc-300 h-3 md:h-6 rounded-sm md:rounded-md drop-shadow-lg animate-pulse w-16 md:w-64"></div>
          </div>
        </div>
      </div>
    )
  }
}