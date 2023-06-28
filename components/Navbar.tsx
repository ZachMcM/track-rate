'use client'

import Link from "next/link"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Image from "next/image"
import { Suspense, useState } from "react"
import SearchBar from "./SearchBar"
import ReviewButton from "./ReviewButton"
import { TbList } from "react-icons/tb"
import Sidebar from "./Sidebar"
import { useSession } from "next-auth/react"

export default function Navbar() {
  const [sideBar, setSidebar] = useState<boolean>(false)
  const { data: session, status } = useSession()

  return (
    <nav className="sticky bg-zinc-950 top-0 left-0 w-full border-b border-zinc-700 py-5 px-10 flex items-center justify-between">
      <Link href="/" className="z-0 font-bold md:text-lg">TrackRate</Link>
      <div className="flex items-center space-x-4 lg:space-x-8 text-zinc-400 font-semibold text-sm">
        <div className="hidden md:flex">
          {
            status != "loading" && 
            session && session.user.image ? 
              <Link href={`/profile/${session?.user.id}`} className="relative w-8 h-8 lg:w-10 lg:h-10 aspect-square hover:opacity-80 duration-300">
              <Image
                fill
                src={session.user.image}
                alt="avatar"
                className="rounded-full border border-zinc-700 p-0.5"
              />
            </Link> :
            <Link className="duration-300 hover:opacity-80 rounded-md" href={"/signin?callbackUrl=/"}>Sign In</Link>
          }
        </div>
        <Link className="hidden md:block duration-300 hover:opacity-80 rounded-md" href={"/users"}>Users</Link>
        <Link className="hidden md:block duration-300 hover:opacity-80 rounded-md" href={"/music"}>Music</Link>
        <ReviewButton/>
        {/* Todo */}
        <div className="hidden md:block">
          <SearchBar/>
        </div>
        <div className="flex md:hidden">
        <button
          className="hover:opacity-80"
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

