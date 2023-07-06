'use client'

import Image from "next/image"
import Link from "next/link"
import FollowButton from "./FollowButton"
import { useSession } from "next-auth/react"
import { UserExtendedFollowers } from "@/app/types"

export default function UserListItem({ user }: { user: UserExtendedFollowers }) {
  const { data: session } = useSession()

  return (
    <div className="relative flex justify-between items-center p-3 dark:hover:bg-zinc-800 m-3 hover:bg-zinc-100 rounded-lg duration-300">
      <div className="flex space-x-3 items-center">
        <div className="relative h-10 w-10">
          <Image
            src={user.image || ""}
            fill
            alt="avatar"
            className="rounded-full"
          />
        </div>
        <p className="font-medium">{user.name}</p>
      </div>
      {
        session && session.user.id != user.id &&
        <div className="text-sm z-10"><FollowButton user={user}/></div>
      }
      <Link href={`/profile/${user.id}`} className="absolute inset-0 z-0"></Link>
    </div>
  )
}