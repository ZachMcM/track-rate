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
      <nav className="sticky bg-white dark:bg-zinc-900 drop-shadow-md border-b border-zinc-200 dark:border-zinc-800 top-0 left-0 w-full z-20 px-5 py-3 flex items-center justify-between">
        {/* Todo */}
        <div className="flex space-x-2 md:space-x-5 items-center">
          <Link href="/" className="flex font-bold items-center space-x-2 hover:opacity-80 duration-300">
            <TbPlayerTrackNextFilled className="text-xl"/>
            <p className="hidden md:block">trackrate</p>
          </Link>
          {/* Todo */}
          <button 
            className="text-sm bg-white dark:bg-zinc-950 dark:border-zinc-800 border-zinc-200 border drop-shadow-md rounded-lg py-2.5 w-48 md:w-64 px-3 flex items-center space-x-2 "
            onClick={() => setSearchBar(true
              )}
          >
            <TbSearch className="text-xl md:text-zinc-500"/>
            <p className="text-zinc-500">Search...</p>
          </button>  
        </div>
        <div className="flex items-center space-x-2 md:space-x-5 text-sm">
          {
            session &&
            <NewReviewButton/>
          }
          {
            status == "loading" ?
            <div className="w-10 h-10 aspect-square rounded-full bg-zinc-200 animate-pulse flex"></div> :
            status == "authenticated" ?
            <AvatarButton user={session.user}/> :
            <button onClick={() => signIn()} className="rounded-lg duration-300 dark:bg-white dark:text-zinc-950 bg-zinc-950 text-white py-2.5 px-6 hover:opacity-80 font-medium text-sm">Sign In</button>
          }
        </div>
      </nav>
      { searchBar && <SearchBar setModal={setSearchBar}/> }
    </>
  )
}

