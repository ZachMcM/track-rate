'use client'

import { getAccessToken, getAlbum, getArtist, getTrack, getUser } from "@/app/apiMethods"
import { Artist } from "@/app/types"
import Oops from "@/components/Oops"
import ReviewCard from "@/components/ReviewCard"
import { Review } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"

export default function Profile({ params }: { params: { id: string }}) {
  const { data: user } = useQuery({
    queryKey: ['user', params.id],
    queryFn: () => getUser(params.id)
  })

  const accessTokenQuery = useQuery({queryKey: ['access-token'], queryFn: getAccessToken})
  const accessToken = accessTokenQuery.data

  const { data: favAlbum } = useQuery({
    queryKey: ['album', user?.favAlbum],
    queryFn: () => getAlbum(user?.favAlbum || "", accessToken),
    enabled: !!accessToken
  })

  const { data: favArtist } = useQuery({
    queryKey: ['artist', user?.favArtist],
    queryFn: () => getArtist(user?.favArtist || "", accessToken),
    enabled: !!accessToken
  })

  const { data: favTrack } = useQuery({
    queryKey: ['track', user?.favTrack],
    queryFn: () => getTrack(user?.favTrack || "", accessToken),
    enabled: !!accessToken
  })

  if (user) {
    return (
      <div className="flex space-y-10 flex-col">
        <div className="flex flex-col space-y-3">
          <p className="font-medium text-lg">Favorites</p>
          {
            favArtist && favAlbum && favTrack && user?.favAlbum && user.favArtist && user.favTrack ?
            <div className="flex md:items-center flex-col space-y-4 md:space-y-0 grid-cols-3 gap-5 md:grid">
              <div className="flex flex-col space-y-3 shadow-2xl border-zinc-700 border rounded-md p-5">
                <p className="font-medium text-zinc-400">Favorite Album</p>
                <div className="flex space-x-5 items-center">
                  {
                    favAlbum.images &&
                    <Image
                      src={favAlbum.images[0].url || ""}
                      height={70}
                      width={70}
                      alt={favAlbum.name}
                      className="rounded-md"
                    />
                  }
                  <div className="flex flex-col space-y-1">
                    <p className="font-medium">{favAlbum.name.length > 15 ? favAlbum.name.substring(0, 15) + "..." : favAlbum.name}</p>
                    <p className="text-xs text-zinc-400 font-medium">
                      {favAlbum.artists.map((artist: Artist) => {
                        return <span key={artist.id}> {artist.name} </span>;
                      })}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-3 shadow-2xl border-zinc-700 border rounded-md p-5">
                <p className="font-medium text-zinc-400">Favorite Track</p>
                <div className="flex space-x-5 items-center">
                {
                    favTrack.album.images &&
                    <Image
                      src={favTrack.album.images[0].url || ""}
                      height={70}
                      width={70}
                      alt={favTrack.name}
                      className="rounded-md"
                    />
                  }
                  <div className="flex flex-col space-y-1">
                    <p className="font-medium">{favTrack.name}</p>
                    <p className="text-zinc-400 text-sm">{favTrack.album.name}</p>
                    <p className="text-xs text-zinc-400 font-medium">
                      {favTrack.artists.map((artist: Artist) => {
                        return <span key={artist.id}> {artist.name} </span>;
                      })}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-3 shadow-2xl border-zinc-700 border rounded-md p-5">
                <p className="font-medium text-zinc-400">Favorite Artist</p>
                <div className="flex space-x-5 items-center">
                  {
                    favArtist.images &&           
                    <Image
                      src={favArtist.images[0].url || ""}
                      height={70}
                      width={70}
                      alt={favTrack.name}
                      className="rounded-md"
                    />
                  }
                  <div className="flex flex-col space-y-1">
                    <p className="font-medium">{favArtist.name}</p>
                  </div>
                </div>
              </div>
            </div> :
            <Oops message="no favorites"/>   
          }
        </div>   
        <div className="flex flex-col space-y-3">
        <p className="font-medium text-lg">All Reviews</p>
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
          <Oops message="no reviews"/>
        }
        </div>
      </div>
    )
  }
}
