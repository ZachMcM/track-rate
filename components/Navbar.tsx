'use client'

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import SearchBar from "./SearchBar"
import ReviewButton from "./ReviewButton"
import { TbMenu2, TbPlayerTrackNextFilled } from "react-icons/tb"
import Sidebar from "./Sidebar"
import { useSession } from "next-auth/react"
import ProfileDropdwon from "./ProfileDropdown"

export default function Navbar() {
  const [sideBar, setSidebar] = useState<boolean>(false)
  const { data: session, status } = useSession()

  return (
    <nav className="sticky bg-zinc-950 top-0 left-0 w-full z-20 border-b px-5 md:px-10 border-zinc-800 h-16 flex items-center justify-between">
      <button
        className="hover:text-white flex md:hidden"
        onClick={() => setSidebar(true)}
        >
        <TbMenu2 className="text-2xl"/>
      </button>
      <div className="hidden md:flex space-x-5 items-center">
        <Link href="/" className="flex font-bold items-center space-x-2 hover:opacity-80 duration-300">
          <TbPlayerTrackNextFilled className="text-xl"/>
          <p>trackrate</p>
        </Link>
        <div className="flex items-center">
          <Link className="duration-300 text-sm font-medium py-2 px-4 hover:bg-zinc-800 rounded-md" href={"/users"}>Users</Link>
          <Link className="duration-300 text-sm font-medium py-2 px-4 hover:bg-zinc-800 rounded-md" href={"/music"}>Tracks</Link>
          <Link className="duration-300 text-sm font-medium py-2 px-4 hover:bg-zinc-800 rounded-md" href={"/music"}>Albums</Link>
        </div>
      </div>
        
      <div className="flex items-center space-x-3 text-sm">
        <ReviewButton/>
        {/* Todo */}
        <SearchBar/>
        {
          status != "loading" && 
          <>
            {
              session ? 
              <ProfileDropdwon userId={session.user.id} image={session.user.image || ""} name={session.user.name || ""} email={session.user.email || ""}/> :
              <Link className="duration-300 text-sm text-zinc-950 px-4 py-2 font-medium bg-white rounded-md hover:opacity-80" href={"/signin?callbackUrl=/"}>Sign In</Link>
            }
          </>
        }
      </div>
      <Sidebar setSidebar={setSidebar} sideBar={sideBar}/>
      { sideBar && <div className="w-full h-full fixed top-0 left-0 z-30 backdrop-blur-md"></div> }
    </nav>
  )
}

