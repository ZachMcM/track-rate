'use client'

import { Dispatch, SetStateAction } from "react"
import { TbPlayerTrackNextFilled, TbX } from "react-icons/tb"
import Link from "next/link"
import { useDetectClickOutside } from "react-detect-click-outside"

export default function Sidebar({ setSidebar, sideBar }: { setSidebar: Dispatch<SetStateAction<boolean>>, sideBar: boolean }) {
  const ref = useDetectClickOutside({ onTriggered: () => setSidebar(false) })

  return (
    <div ref={ref} className={`${sideBar ? "translate-x-0" : "-translate-x-full"} z-40 duration-300 fixed top-0 left-0 w-4/5 bg-zinc-950 h-full border-r border-zinc-800 text-zinc-400 font-medium p-8`}>
      <button
        className="hover:text-white duration-300 text-zinc-400 absolute right-0 top-0 p-5"
        onClick={() => setSidebar(false)}
      >
        <TbX className="text-lg"/>
      </button>      
      <div className="flex flex-col space-y-8">
        <Link 
          href="/" 
          className="font-bold flex items-center space-x-2 text-white hover:opacity-80 duration-300"
          onClick={() => setSidebar(false)}
        >
          <TbPlayerTrackNextFilled className="text-xl"/>
          <p>trackrate</p>
        </Link>
        <div className="flex flex-col space-y-5 text-white">
          <Link className="duration-300 hover:underline text-sm font-medium pb-5 border-b border-zinc-800" href={"/users"}>Users</Link>
          <Link className="duration-300 hover:underline text-sm font-medium pb-5 border-b border-zinc-800" href={"/music"}>Tracks</Link>
          <Link className="duration-300 hover:underline text-sm font-medium pb-5 border-b border-zinc-800" href={"/music"}>Albums</Link>
        </div>
      </div>
    </div>
  )
}