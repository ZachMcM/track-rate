'use client'

import { getUser } from "@/app/apiMethods"
import { useQuery } from "@tanstack/react-query"
import UserListItem from "./UserListItem"
import LoadingSpinner from "./LoadingSpinner"
import { UserExtendedFollowers } from "@/app/types"

export default function FollowersList({ id }: { id: string }) {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id)
  })

  if (user && !isLoading) {
    return (
      <div className="flex flex-col space-y-3">
        <p className="font-medium">{user.name}'s Followers</p>
        {
          user.followers.length != 0 ?       
          <div className="flex flex-col space-y-8 bg-white drop-shadow-lg rounded-lg p-2">
            {
              user.followers
              .map((follower: UserExtendedFollowers) => {
                return <UserListItem key={follower.id} user={follower}/>
              })
            }
          </div> :
          <div className="flex px-5 py-10 bg-white rounded-md justify-center items-center drop-shadow-lg">
            <p className="text-zinc-400 text-sm">Not following anyone</p>
          </div>
        }
      </div>
    )
  } else {
    return (
      <LoadingSpinner/>
    )
  }
}