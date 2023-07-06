'use client'

import { getUser } from "@/app/apiMethods"
import { UserExtendedFollowers } from "@/app/types"
import { useQuery } from "@tanstack/react-query"
import UserListItem from "@/components/UserListItem"
import LoadingSpinner from "@/components/LoadingSpinner"

export default function Following({ params }: { params: { id: string } }) {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user', { id: params.id }],
    queryFn: () => getUser(params.id)
  })

  if (user && !isLoading) {
    return (
      <div className="flex flex-col space-y-3">
        <p className="font-medium text-lg">Following</p>
        {
          user.follows.length != 0 ?       
          <div className="flex flex-col rounded-lg drop-shadow-md dark:bg-zinc-900 bg-white">
            {
              user.follows
              .map((following: UserExtendedFollowers) => {
                return <UserListItem key={following.id} user={following}/>
              })
            }
          </div> :
          <div className="flex px-5 py-10 bg-white rounded-lg drop-shadow-md dark:bg-zinc-900 justify-center items-center basis-2/3">
            <p className="text-zinc-500 text-sm">Not following anyone</p>
          </div>
        }
      </div>
    )
  } else {
    return <LoadingSpinner/> 
  }

}