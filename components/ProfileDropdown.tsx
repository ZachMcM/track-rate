'use client'

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { TbArrowBarRight, TbHeart, TbSettings, TbUser } from "react-icons/tb"
import { signOut } from "next-auth/react"
import { useDetectClickOutside } from "react-detect-click-outside"


export default function ProfileDropdwon({ image, userId, name, email }: { image: string, userId: string, name: string, email: string }) {
  const [dropdown, setDropdown] = useState<boolean>(false)
  const dropdownRef = useDetectClickOutside({ onTriggered: () => setDropdown(false) })

  function Dropdown() {
    return (
      <div className="absolute top-11 bg-zinc-950 right-0 border border-zinc-800 rounded-md">
        <div ref={dropdownRef} className="px-4 py-2 border-b border-zinc-800 font-normal text-sm flex flex-col">
          <p className="font-medium">{name}</p>
          <p className="text-zinc-400 text-xs">{email}</p>
        </div>
        <div className="border-b border-zinc-800 font-normal text-sm flex flex-col text-white bg-zinc-950">
          <Link href={`/profile/${userId}`} className="flex space-x-2 items-center px-2 py-1.5 m-1 hover:bg-zinc-800 duration-300 rounded-md">
            <TbUser className="text-lg"/>
            <p>Profile</p>
          </Link>
          <Link href={`/profile/${userId}/likes`} className="flex space-x-2 items-center px-2 py-1.5 m-1 hover:bg-zinc-800 duration-300 rounded-md">
            <TbHeart className="text-lg"/>
            <p>Likes</p>
          </Link>
          <Link href="/settings" className="flex space-x-2 items-center px-2 py-1.5 m-1 hover:bg-zinc-800 duration-300 rounded-md">
            <TbSettings className="text-lg"/>
            <p>Settings</p>
          </Link>
        </div>
        <div className="font-normal text-sm flex flex-col text-white bg-zinc-950 rounded-b-md">
          <button 
            onClick={() => signOut()} 
            className="flex space-x-2 items-center p-2 m-1 hover:bg-zinc-800 duration-300 rounded-md"
          >
            <TbArrowBarRight className="text-lg"/>
            <p>Sign Out</p>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
    { dropdown && <Dropdown/>}
      <button 
        onClick={() => setDropdown(true)}
        className="flex items-center space-x-2 hover:opacity-80 duration-300"
      >
        <div className="relative w-10 h-10 lg:w-10 lg:h-10 aspect-square ">
          <Image
            fill
            src={image}
            alt="avatar"
            className="rounded-full border border-zinc-800 p-0.5 bg-zinc-800"
          />
        </div>
      </button>
    </div>
  )
}

