'use client'

import { useState } from "react"
import ProfileDropdwon from "./ProfileDropdown"
import Image from "next/image"

export default function AvatarButton({ user }: { user: {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
} & {
  id: string;
} }) {
  const [dropdown, setDropdown] = useState<boolean>(false)


  return (
    <div className="relative">
    { dropdown && <ProfileDropdwon userId={user.id} name={user.name || ""} email={user.email || ""} setDropdown={setDropdown}/>}
      <button 
        onClick={() => setDropdown(true)}
        className="flex items-center space-x-2 hover:ring-4 rounded-full ring-sky-200 duration-300"
      >
        <div className="relative w-10 h-10 aspect-square drop-shadow-lg ">
          <Image
            fill
            src={user.image || ""}
            alt="avatar"
            className="rounded-full bg-zinc-100 drop-shadow-lg"
          />
        </div>
      </button>
    </div>
  )
}