'use client'

import { Dispatch, SetStateAction } from "react"
import { TbHome, TbPlayerTrackNextFilled, TbPlaylist, TbUser, TbX } from "react-icons/tb"
import SearchBar from "./SearchBar"
import { useSession, signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

export default function Sidebar({ setSidebar, sideBar }: { setSidebar: Dispatch<SetStateAction<boolean>>, sideBar: boolean }) {
  const { data: session } = useSession()

  return (
    <div className={`${sideBar ? "translate-x-0" : "translate-x-full"} duration-300 fixed top-0 right-0 w-full bg-zinc-950 h-full border-l border-zinc-800 text-zinc-400 font-medium p-8 flex flex-col space-y-5`}>
        <button
          className="hover:text-white duration-300 text-zinc-400 self-end"
          onClick={() => setSidebar(false)}
        >
          <TbX className="text-lg"/>
        </button>
        <Link 
          href="/" 
          className="font-bold flex items-center space-x-2 text-white hover:opacity-80 duration-300"
          onClick={() => setSidebar(false)}
        >
          <TbPlayerTrackNextFilled className="text-xl"/>
          <p>trackrate</p>
        </Link>
        <SearchBar/>
        {
          session && session.user && session.user.image ?        
          <div className="flex flex-col space-y-4 border-b border-zinc-800 pb-4">
            <Link onClick={() => setSidebar(false)} href={`/profile/${session.user.id}`} className="flex space-x-3 items-center hover:opacity-80 duration-300">
              <Image
                src={session.user.image}
                width={30}
                height={30}
                alt="avatar"
                className="rounded-full border border-zinc-800 p-0.5"
              />
              <p>{session.user.name}</p>
            </Link> 
            <Link onClick={() => setSidebar(false)} href={`/profile/${session.user.id}`} className="hover:text-white duration-300">Profile</Link>
            <Link onClick={() => setSidebar(false)} href="/settings" className="hover:text-white duration-300">Settings</Link>
            <button onClick={() => {
              setSidebar(false)
              signOut()
            }} className="hover:text-white duration-300 w-fit">Sign Out</button>
          </div> : 
          <Link onClick={() => setSidebar(false)} className="hover:text-white duration-300" href="/signin">Sign In</Link>
        }
        <div className="flex flex-col space-y-4 border-b border-zinc-800 pb-4">
        <Link onClick={() => setSidebar(false)} className="hover:text-white duration-300 flex items-center space-x-2" href="/">
            <TbHome className="text-xl"/>
            <p>Home</p>
          </Link>
          <Link onClick={() => setSidebar(false)} className="hover:text-white duration-300 flex items-center space-x-2" href="/music">
            <TbPlaylist className="text-xl"/>
            <p>Music</p>
          </Link>
          <Link onClick={() => setSidebar(false)} className="hover:text-white duration-300 flex items-center space-x-2" href="/users">
            <TbUser className="text-xl"/>
            <p>Users</p>
          </Link>
        </div>
      </div>
  )
}