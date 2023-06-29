'use client'

import { getUser } from "@/app/apiMethods"
import { User } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import UserListItem from "./UserListItem"
import Alert from "./Alert"
import { useSession } from "next-auth/react"
import LoadingSpinner from "./LoadingSpinner"

export default function FollowersList({ id }: { id: string }) {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id)
  })

  const { data: session } = useSession()

  if (user && !isLoading) {
    return (
      <div className="flex flex-col space-y-3">
        <p className="font-medium">{user.name}'s Followers</p>
        {
          user.followers.length != 0 ?       
          <div className="flex flex-col space-y-8">
            {
              user.followers
              .map((follower: User) => {
                return <UserListItem key={follower.id} userId={follower.id}/>
              })
            }
          </div> :
          <Alert message={`${user.id == session?.user.id ? "You" : user.name} is has no followers.`}/>
        }
      </div>
    )
  } else {
    return (
      <LoadingSpinner/>
    )
  }
}