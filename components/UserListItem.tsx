'use client'

import { getUser } from "@/app/apiMethods"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import FollowButton from "./FollowButton"
import { useSession } from "next-auth/react"
import UserSkeleton from "./UserSkeleton"

export default function UserListItem({ userId }: { userId: string }) {
  const { data: user } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId)
  })

  const { data: session } = useSession()

  return (
    <div className="flex justify-between p-5 rounded-md border border-zinc-800 shadow-2xl">
      {
        user ?
        <>
          <div className="flex space-x-3 items-center">
            <Image
              src={user.image || ""}
              height={50}
              width={50}
              alt="avatar"
              className="rounded-full border border-zinc-800 p-1"
            />
            <div className="flex flex-col space-y-1">
              <Link href={`/profile/${user.id}`} className="font-bold hover:opacity-80 duration-300 text-sm md:text-md">{user.name}</Link>
              <div className="flex space-x-2 items-center text-zinc-400 font-medium text-xs md:text-sm">
                <Link className="hover:opacity-80 duration-300" href={`/profile/${user.id}/followers`}>{user.followers.length} Follower{user.followers.length != 1 && "s"}</Link>
                <Link className="hover:opacity-80 duration-300" href={`/profile/${user.id}/following`}>{user.follows.length} Following{user.follows.length != 1 && "s"}</Link>
              </div>
            </div>
          </div>
          <div className="flex space-x-10 items-center">
            <div className="hidden md:flex flex-col space-y-1 items-center text-center">
              <p className="font-semibold">{user.reviews.length}</p>
              <Link href={`/profile/${user.id}`} className="hover:opacity-80 duration-300 text-sm text-zinc-400">Review{user.reviews.length != 1 && "s"}</Link>
            </div>
            {
              session && session.user.id != user.id &&
              <div className="hidden md:block"><FollowButton user={user}/></div>
            }
          </div>
        </> :
        <UserSkeleton/>
      }
    </div>
  )
}