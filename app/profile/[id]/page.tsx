'use client'

import { getUser } from "@/app/apiMethods"
import Alert from "@/components/Alert"
import FavoriteCard from "@/components/FavoriteCard"
import LoadingSpinner from "@/components/LoadingSpinner"
import ProfileReviewList from "@/components/ProfileReviewList"
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
      <div className="flex space-y-16 flex-col">
        <div className="flex flex-col space-y-5">
          <div className="flex flex-col">
            <p className="font-medium text-lg">Favorites</p>
            <p className="font-medium text-sm text-zinc-400">Favorite album, song and artist.</p>
          </div>
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
            <Alert message={`${user.id == session?.user.id ? "You have" : user.name + " has"} no favorites.`}/>
          }
        </div>   
        <ProfileReviewList user={user}/>
      </div>
    )
  } else {
    return (
      <LoadingSpinner/>
    )
  }
}
