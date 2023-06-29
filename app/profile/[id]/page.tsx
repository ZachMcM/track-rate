'use client'

import { getUser } from "@/app/apiMethods"
import Alert from "@/components/Alert"
import FavoriteCard from "@/components/FavoriteCard"
import LoadingSpinner from "@/components/LoadingSpinner"
import ReviewCard from "@/components/ReviewCard"
import { Review } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { TbExclamationCircle, TbUserX } from "react-icons/tb"

export default function Profile({ params }: { params: { id: string }}) {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user', params.id],
    queryFn: () => getUser(params.id)
  })

  const { data: session } = useSession()

  if (user && !isLoading) {
    if (user.reviews.length == 0 && !user.favAlbum && !user.favTrack && !user.favArtist) {
      return <Alert message="There is no content here"/>
    }
    return (
      <div className="flex space-y-10 flex-col">
        <div className="flex flex-col space-y-3">
          <p className="font-medium">Favorites</p>
          {
            user.favAlbum || user.favArtist || user.favTrack ?
            <div className="flex md:items-center flex-col space-y-4 md:space-y-0 grid-cols-3 gap-5 md:grid">
              {
                user.favAlbum &&
                <FavoriteCard id={user.favAlbum} type="album"/>
              }
              {
                user.favTrack &&
                <FavoriteCard id={user.favTrack} type="track"/>
              }
              {
                user.favArtist &&
                <FavoriteCard id={user.favArtist} type="artist"/>
              }
            </div> :
            <Alert message={`${user.id == session?.user.id ? "You" : user.name} has no favorites.`}/>
          }
        </div>   
        <div className="flex flex-col space-y-3">
        <p className="font-medium">All Reviews</p>
        {
          user.reviews.length != 0 ?
          <div className="flex flex-col space-y-8">
            {
              user.reviews
              .sort((a: Review, b: Review) => {
                return (new Date(b.createdAt)).getTime() - (new Date(a.createdAt)).getTime()
              })
              .map((review: Review) => {
                return <ReviewCard name={false} key={review.id} review={review}/>
              })
            }
          </div> :
          <Alert message={`${user.id == session?.user.id ? "You" : user.name} has no reviews.`}/>
        }
        </div>
      </div>
    )
  } else {
    return (
      <LoadingSpinner/>
    )
  }
}
