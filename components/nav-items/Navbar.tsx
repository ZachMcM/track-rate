'use client'

import Link from "next/link"
import SearchBar from "./SearchBar"
import { TbPlayerTrackNextFilled } from "react-icons/tb"
import { useSession, signIn } from "next-auth/react"
import AvatarButton from "./AvatarButton"
import NewReviewButton from "./NewReviewButton"

export default function Navbar() {
  const { data: session, status,  } = useSession()

  return (
    <nav className="sticky drop-shadow-md bg-white top-0 left-0 w-full z-20 px-5 md:px-10 h-16 flex items-center justify-between">
      {/* Todo */}
      <div className="flex md:space-x-5 items-center">
        <Link href="/" className="flex font-bold items-center space-x-2 hover:opacity-80 duration-300">
          <TbPlayerTrackNextFilled className="text-xl"/>
          <p>trackrate</p>
        </Link>
        <SearchBar/>
      </div>
      <div className="flex items-center space-x-5 text-sm">
        {/* Todo */}
        <NewReviewButton/>
        {
          status == "loading" ?
          <div className="w-10 h-10 aspect-square rounded-full bg-zinc-200 animate-pulse flex"></div> :
          status == "authenticated" ?
          <AvatarButton user={session.user}/> :
          <button onClick={() => signIn()} className="rounded-lg duration-300 bg-white drop-shadow-lg border-zinc-200 border py-2.5 px-6 hover:opacity-80 font-medium text-sm">Sign In</button>
        }
      </div>
    </nav>
  )
}

