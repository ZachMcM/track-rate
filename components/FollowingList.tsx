'use client'

import { getUser } from "@/app/apiMethods"
import { User } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import UserListItem from "./UserListItem"
import Alert from "./Alert"
import { useSession } from "next-auth/react"
import LoadingSpinner from "./LoadingSpinner"

export default function FollowingList({ id }: { id: string }) {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id)
  })

  const { data: session } = useSession()

  if (user && !isLoading) {
    return (
      <div className="flex flex-col space-y-3">
        <p className="font-medium">{user.name}'s Following</p>
        {
          user.follows.length != 0 ?       
          <div className="flex flex-col space-y-8">
            {
              user.follows
              .map((following: User) => {
                return <UserListItem key={following.id} userId={following.id}/>
              })
            }
          </div> :
          <Alert message={`${user.id == session?.user.id ? "You" : user.name} is not following anyone.`}/>
        }
      </div>
    )
  } else {
    return (
      <LoadingSpinner/>
    )
  }
}