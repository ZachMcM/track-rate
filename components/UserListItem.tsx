'use client'

import { getUser } from "@/app/apiMethods"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import FollowButton from "./FollowButton"
import { useSession } from "next-auth/react"

export default function UserListItem({ userId }: { userId: string }) {
  const { data: user } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId)
  })

  const { data: session } = useSession()

  return (
    <div className="flex justify-between p-5 rounded-md border border-zinc-700 shadow-2xl">
      {
        user ?
        <>
          <div className="flex space-x-3 items-center">
            <Image
              src={user.image || ""}
              height={50}
              width={50}
              alt="avatar"
              className="rounded-full border border-zinc-700 p-1"
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
              <Link href={`/profile/${user.id}/reviews`} className="hover:opacity-80 duration-300 text-sm text-zinc-400">Review{user.reviews.length != 1 && "s"}</Link>
            </div>
            <div className="hidden md:flex flex-col space-y-1 items-center text-center">
              <p className="font-semibold">{user.likes.length}</p>
              <Link href={`/profile/${user.id}/likes`} className="hover:opacity-80 duration-300 text-sm text-zinc-400">Like{user.likes.length != 1 && "s"}</Link>
            </div>
            {
              session &&
              <div className="hidden md:block"><FollowButton user={user}/></div>
            }
          </div>
        </> :
        <div className="flex space-x-3 items-center">
          <div className="h-12 w-12 rounded-full bg-zinc-700 animate-pulse"></div>
          <div className="flex flex-col space-y-2">
            <div className="h-2 w-48 bg-zinc-700 rounded-full animate-pulse"></div>
            <div className="h-2 w-28 bg-zinc-700 rounded-full animate-pulse"></div>
            <div className="h-2 w-12 bg-zinc-700 rounded-full animate-pulse"></div>
          </div>
        </div>
      }
    </div>
  )
}