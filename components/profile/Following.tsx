'use client'

import { getUser } from "@/app/apiMethods"
import { UserExtendedFollowers } from "@/app/types"
import { useQuery } from "@tanstack/react-query"
import UserListItem from "../UserListItem"
import LoadingSpinner from "../LoadingSpinner"

export default function Following({ id }: { id: string }) {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user', { id: id }],
    queryFn: () => getUser(id)
  })

  if (user && !isLoading) {
    return (
      <div className="flex flex-col space-y-3">
        <p className="font-medium text-lg">Following</p>
        {
          user.follows.length != 0 ?       
          <div className="flex flex-col space-y-8 bg-white drop-shadow-lg border border-zinc-200 rounded-lg p-2">
            {
              user.follows
              .map((following: UserExtendedFollowers) => {
                return <UserListItem key={following.id} user={following}/>
              })
            }
          </div> :
          <div className="flex px-5 py-10 bg-white rounded-md justify-center items-center drop-shadow-lg border border-zinc-200">
            <p className="text-zinc-400 text-sm">Not following anyone</p>
          </div>
        }
      </div>
    )
  } else {
    return <LoadingSpinner/> 
  }

}