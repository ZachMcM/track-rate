'use client'

import { signOut } from "next-auth/react"
import Link from "next/link"
import { TbArrowBarToRight, TbPencil } from "react-icons/tb"

export default function SettingsButton({ id }: { id: string }) {

  return (
    <div className="flex space-x-3 items-center text-xs font-semibold">
      <button 
        className="py-2 px-4 rounded-md border-gray-700 border hover:opacity-80 duration-300"
        onClick={() => signOut()}
      >
        <p>Sign Out</p>
      </button>
      <Link 
        href={`/profile/${id}/edit`}
        className="py-2 px-4 rounded-md border-gray-700 border hover:opacity-80 duration-300"
      >
        <p>Edit Profile</p>
      </Link>
    </div>
  )
}