'use client'

import { usePathname } from "next/navigation"

export default function ProfileMenu({ id }: { id: string }) {
  const pathname = usePathname()

  return (
    <div className="w-full border-gray-700 border rounded-md flex items-center justify-around text-xs md:text-sm font-medium">
      <a
        href={`/profile/${id}`}
        className={`m-1 py-2 px-1 md:px-2 md:m-2 rounded-md hover:bg-gray-700 duration-300 ${pathname == `/profile/${id}` && "bg-gray-700"}`}
      >
        <p>Profile</p>
      </a>
      <a
        href={`/profile/${id}/activity`}
        className={`m-1 py-2 px-1 md:px-2 md:m-2 rounded-md hover:bg-gray-700 duration-300 ${pathname == `/profile/${id}/activity` && "bg-gray-700"}`}
      >
        <p>Activity</p>
      </a>
      <a
        href={`/profile/${id}/reviews`}
        className={`m-1 py-2 px-1 md:px-2 md:m-2 rounded-md hover:bg-gray-700 duration-300 ${pathname == `/profile/${id}/reviews` && "bg-gray-700"}`}
      >
        <p>Reviews</p>
      </a>
      <a
        href={`/profile/${id}/likes`}
        className={`m-1 py-2 px-1 md:px-2 md:m-2 rounded-md hover:bg-gray-700 duration-300 ${pathname == `/profile/${id}/likes` && "bg-gray-700"}`}
      >
        <p>Likes</p>
      </a>
    </div>
  )
}