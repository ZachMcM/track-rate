'use client'

import { usePathname } from "next/navigation"
import Link from "next/link"

export default function ProfileMenu({ id }: { id: string }) {
  const pathname = usePathname()

  return (
    <div className="mt-20 w-full border-gray-700 border rounded-md flex items-center justify-around text-xs md:text-sm font-medium">
      <Link
        href={`/profile/${id}`}
        className={`m-2 p-2 rounded-md hover:bg-gray-700 duration-300 ${pathname == `/profile/${id}` && "bg-gray-700"}`}
      >
        <p>Profile</p>
      </Link>
      <Link
        href={`/profile/${id}/activity`}
        className={`m-2 p-2 rounded-md hover:bg-gray-700 duration-300 ${pathname == `/profile/${id}/activity` && "bg-gray-700"}`}
      >
        <p>Activity</p>
      </Link>
      <Link
        href={`/profile/${id}/reviews`}
        className={`m-2 p-2 rounded-md hover:bg-gray-700 duration-300 ${pathname == `/profile/${id}/reviews` && "bg-gray-700"}`}
      >
        <p>Reviews</p>
      </Link>
      <Link
        href={`/profile/${id}/likes`}
        className={`m-2 p-2 rounded-md hover:bg-gray-700 duration-300 ${pathname == `/profile/${id}/likes` && "bg-gray-700"}`}
      >
        <p>Likes</p>
      </Link>
    </div>
  )
}