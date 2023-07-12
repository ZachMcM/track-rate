'use client'

import { useState } from "react"
import ProfileDropdown from "./ProfileDropdown"
import Image from "next/image"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export default function AvatarButton({ user }: { user: {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
} & {
  id: string;
}}) {
  const [dropdown, setDropdown] = useState<boolean>(false)


  return (
    <div className="relative">
    { dropdown && <ProfileDropdown userId={user.id} name={user.name || ""} email={user.email || ""} setDropdown={setDropdown}/>}
      <button 
        onClick={async () => {
          setDropdown(true)
          await new Promise((resolve) => setTimeout(resolve, 1000))
        }}
        className="flex items-center space-x-2 hover:opacity-80 rounded-full duration-300"
      >
        <div className="relative w-10 h-10 aspect-square drop-shadow-md">
          <Image
            fill
            src={user.image || ""}
            alt="avatar"
            className="rounded-full drop-shadow-md"
          />
        </div>
      </button>
    </div>
  )
}