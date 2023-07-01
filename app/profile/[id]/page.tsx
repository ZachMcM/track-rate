'use client'

import { getUser } from "@/app/apiMethods"
import { FullReview } from "@/app/types"
import Alert from "@/components/Alert"
import FavoriteCard from "@/components/FavoriteCard"
import LoadingSpinner from "@/components/LoadingSpinner"
import ReviewCard from "@/components/ReviewCard"
import { Review } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

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
      <div className="flex space-y-8 flex-col">
        <div className="flex flex-col space-y-5">
          <div className="flex flex-col space-y-1">
            <p className="font-medium text-xl md:text-2xl">Favorites</p>
            <p className="font-medium text-sm text-zinc-400">Favorite album, song and artist.</p>
          </div>
          {
            user.favAlbum || user.favArtist || user.favTrack ?
            <div className="flex md:items-center flex-col space-y-3 md:space-y-0 grid-cols-3 gap-5 md:grid">
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
            <Alert message={`${user.id == session?.user.id ? "You have" : user.name + " has"} no favorites.`}/>
          }
        </div>   
        <div className="flex flex-col space-y-5">
      <div className="flex flex-col space-y-3">
        <div className="flex flex-col space-y-1">
          <p className="font-medium text-xl md:text-2xl">Reviews</p>
          <p className="font-medium text-sm text-zinc-400">A list of all the reviews posted.</p>
        </div>
      </div>
    {
      user.reviews.length != 0 ?
      <div className="flex flex-col space-y-8">
        {
          user.reviews
          .map((review: FullReview) => {
            return <ReviewCard key={review.id} review={review}/>
          })
        }
      </div> :
      <Alert message={`${user.id == session?.user.id ? "You have" : user.name + " has"} no reviews.`}/>
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
