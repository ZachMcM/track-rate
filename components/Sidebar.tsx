'use client'

import { Dispatch, SetStateAction, Suspense } from "react"
import { TbPlaylist, TbUser, TbX } from "react-icons/tb"
import SearchBar from "./SearchBar"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

export default function Sidebar({ setSidebar, sideBar }: { setSidebar: Dispatch<SetStateAction<boolean>>, sideBar: boolean }) {
  const { data: session } = useSession()

  return (
    <div className={`${sideBar ? "translate-x-0" : "translate-x-full"} duration-300 fixed top-0 right-0 w-full bg-gray-950 h-full border-l border-gray-700 p-8 flex flex-col space-y-5`}>
        <button
          className="border border-gray-700 rounded-md p-1 hover:opacity-80 duration-300 w-fit self-end"
          onClick={() => setSidebar(false)}
        >
          <TbX/>
        </button>
        <h1 className="font-bold text-lg text-white">TrackRate</h1>
        <SearchBar/>
        {
          session && session.user && session.user.image ?        
          <div className="flex flex-col space-y-4 border-b border-gray-700 pb-4">
            <a href={`/profile/${session.user.id}`} className="flex space-x-3 items-center hover:opacity-80 duration-300">
              <Image
                src={session.user.image}
                width={30}
                height={30}
                alt="avatar"
                className="rounded-full"
              />
              <p>{session.user.name}</p>
            </a> 
            <a href={`/profile/${session.user.id}/reviews`} className="hover:opacity-80 duration-300">Reviews</a>
            <a href={`/profile/${session.user.id}/activity`} className="hover:opacity-80 duration-300">Activity</a>
            <a href={`/profile/${session.user.id}/likes`} className="hover:opacity-80 duration-300">Likes</a>
          </div> : 
          <Link onClick={() => setSidebar(false)} className="hover:opacity-80 duration-300" href="/signin">Sign In</Link>
        }
        <div className="flex flex-col space-y-4 border-b border-gray-700 pb-4">
          <Link onClick={() => setSidebar(false)} className="hover:opacity-80 duration-300 flex items-center space-x-2" href="/music">
            <TbPlaylist className="text-xl"/>
            <p>Music</p>
          </Link>
          <Link onClick={() => setSidebar(false)} className="hover:opacity-80 duration-300 flex items-center space-x-2" href="/users">
            <TbUser className="text-xl"/>
            <p>Users</p>
          </Link>
        </div>
      </div>
  )
}