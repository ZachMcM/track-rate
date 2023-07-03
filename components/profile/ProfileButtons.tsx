'use client'

import { UserExtendedFollowers } from "@/app/types"
import { useSession } from "next-auth/react"
import FollowButton from "../FollowButton"

export default function ProfileButtons({ user }: { user: UserExtendedFollowers }) {
  const { data: session } = useSession()

  if (session) {
    return (
      <>
      {
        session.user.id == user.id ?
        <button
          className='py-3 px-4 rounded-md drop-shadow-lg bg-sky-400 font-medium text-white hover:opacity-80 duration-300'
        >
          <p>Settings</p>
        </button> : 
        <FollowButton user={user}/>
      }
      </>
    )
  }
}