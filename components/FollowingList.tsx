'use client'

import { getUser } from "@/app/apiMethods"
import { User } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import UserListItem from "./UserListItem"
import Link from "next/link"
import { TbArrowLeft } from "react-icons/tb"
import Oops from "./Oops"

export default function FollowingList({ id }: { id: string }) {
  const { data: user } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id)
  })


  if (user) {
    return (
      <div className="flex flex-col space-y-3">
        <p className="font-medium text-lg">{user.name}'s Following</p>
        {
          user.follows.length != 0 ?       
          <div className="flex flex-col space-y-8">
            {
              user.follows
              .map((following: User) => {
                return <UserListItem userId={following.id}/>
              })
            }
          </div> :
          <Oops message="not following anyone" backUrl={`/profile/${user.id}`}/>
        }
      </div>
    )
  }
}