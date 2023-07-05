'use client'

import Link from "next/link"
import SearchBar from "./SearchBar"
import { TbPlayerTrackNextFilled, TbSearch } from "react-icons/tb"
import { useSession, signIn } from "next-auth/react"
import AvatarButton from "./AvatarButton"
import NewReviewButton from "./NewReviewButton"
import { useState } from "react"

export default function Navbar() {
  const { data: session, status,  } = useSession()
  const [searchBar, setSearchBar] = useState<boolean>(false)

  return (
    <>
      <nav className="sticky bg-white drop-shadow-lg border-b border-zinc-200 top-0 left-0 w-full z-20 px-5 py-3 md:px-10 flex items-center justify-between">
        {/* Todo */}
        <div className="flex space-x-3 items-center">
          <Link href="/" className="flex font-bold items-center space-x-2 hover:opacity-80 duration-300">
            <TbPlayerTrackNextFilled className="text-xl"/>
            <p className="hidden md:block">trackrate</p>
          </Link>
          {/* Todo */}
          <button 
            className="text-sm bg-zinc-100 border-zinc-200 border drop-shadow-lg rounded-lg py-2.5 w-40 md:w-52 px-3 flex items-center space-x-2 "
            onClick={() => setSearchBar(true
              )}
          >
            <TbSearch className="text-xl md:text-zinc-500"/>
            <p className="text-zinc-500">Search...</p>
          </button>  
        </div>
        <div className="flex items-center space-x-3 text-sm">
          {
            session &&
            <NewReviewButton/>
          }
          {
            status == "loading" ?
            <div className="w-10 h-10 aspect-square rounded-full bg-zinc-200 animate-pulse flex"></div> :
            status == "authenticated" ?
            <AvatarButton user={session.user}/> :
            <button onClick={() => signIn()} className="rounded-lg duration-300 bg-zinc-950 text-white py-2.5 px-6 hover:opacity-80 font-medium text-sm">Sign In</button>
          }
        </div>
      </nav>
      { searchBar && <SearchBar setModal={setSearchBar}/> }
    </>
  )
}

