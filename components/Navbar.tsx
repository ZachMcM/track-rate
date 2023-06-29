'use client'

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import SearchBar from "./SearchBar"
import ReviewButton from "./ReviewButton"
import { TbList, TbPlayerTrackNextFilled } from "react-icons/tb"
import Sidebar from "./Sidebar"
import { useSession } from "next-auth/react"

export default function Navbar() {
  const [sideBar, setSidebar] = useState<boolean>(false)
  const { data: session, status } = useSession()

  return (
    <nav className="sticky bg-zinc-950 top-0 left-0 w-full z-30 border-b px-10 border-zinc-800 h-16 flex items-center justify-between">
      <Link href="/" className="font-bold flex items-center space-x-2 hover:opacity-80 duration-300">
        <TbPlayerTrackNextFilled className="text-xl"/>
        <p>trackrate</p>
      </Link>        
      <div className="flex items-center space-x-4 lg:space-x-8 text-zinc-400 font-semibold text-sm">
        <div className="hidden md:flex">
          {
            status != "loading" && 
            <>
              {
                session && session.user.image ? 
                <Link href={`/profile/${session?.user.id}`} className="flex items-center space-x-2 hover:opacity-80 duration-300">
                  <div className="relative w-8 h-8 lg:w-10 lg:h-10 aspect-square ">
                  <Image
                    fill
                    src={session.user.image}
                    alt="avatar"
                    className="rounded-full border border-zinc-800 p-0.5"
                  />
                  </div>
                  <p className="hidden lg:block">{session.user.name}</p>
                </Link> :
                <Link className="duration-300 hover:text-white rounded-md" href={"/signin?callbackUrl=/"}>Sign In</Link>
              }
            </>
          }
        </div>
        <Link className="hidden md:block duration-300 hover:text-white rounded-md" href={"/users"}>Users</Link>
        <Link className="hidden md:block duration-300 hover:text-white rounded-md" href={"/music"}>Music</Link>
        <ReviewButton/>
        {/* Todo */}
        <div className="hidden md:block">
          <SearchBar/>
        </div>
        <div className="flex md:hidden">
        <button
          className="hover:text-white"
          onClick={() => setSidebar(true)}
          >
          <TbList className="text-2xl"/>
        </button>
        </div>
      </div>
      <Sidebar setSidebar={setSidebar} sideBar={sideBar}/>
    </nav>
  )
}

