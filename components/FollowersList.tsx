'use client'

import { getUser } from "@/app/apiMethods"
import { User } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import UserListItem from "./UserListItem"
import Link from "next/link"
import { TbArrowLeft } from "react-icons/tb"
import Oops from "./Oops"

export default function FollowersList({ id }: { id: string }) {
  const { data: user } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id)
  })

  if (user) {
    return (
      <div className="flex flex-col space-y-3">
        <p className="font-medium text-lg">{user.name}'s Followers</p>
        {
          user.followers.length != 0 ?       
          <div className="flex flex-col space-y-8">
            {
              user.followers
              .map((follower: User) => {
                return <UserListItem userId={follower.id}/>
              })
            }
          </div> :
          <Oops message="no followers" backUrl={`/profile/${user.id}`}/>
        }
      </div>
    )
  }
}