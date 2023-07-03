'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function ProfileNav({ id }: { id: string }) {
  const pathname = usePathname()

  return (
    <> 
      <div className="flex md:items-center gap-2 md:gap-0 flex-wrap items-start md:space-y-0 md:space-x-1 text-zinc-400 text-sm font-normal md:text-zinc-950 md:font-medium md:text-base">
        <Link 
          href={`/profile/${id}/reviews`} 
          className={`md:px-4 md:py-2 hover:text-sky-400  duration-300 rounded-lg ${pathname == `/profile/${id}/reviews` ? "text-sky-400" : "md:hover:bg-zinc-100 md:hover:text-zinc-950"}`}>
            Reviews
        </Link>
        <p className="md:hidden">•</p>
        <Link 
          href={`/profile/${id}/likes`} 
          className={`md:px-4 md:py-2 hover:text-sky-400 duration-300 rounded-lg ${pathname == `/profile/${id}/likes` ? "text-sky-400" : "md:hover:bg-zinc-100 md:hover:text-zinc-950"}`}>
            Likes
        </Link>
        <p className="md:hidden">•</p>
        <Link 
          href={`/profile/${id}/followers`} 
          className={`md:px-4 md:py-2 hover:text-sky-400 duration-300 rounded-lg ${pathname == `/profile/${id}/followers` ? "text-sky-400" : "md:hover:bg-zinc-100 md:hover:text-zinc-950"}`}>
            Followers
        </Link>
        <p className="md:hidden">•</p>
        <Link 
          href={`/profile/${id}/following`} 
          className={`md:px-4 md:py-2 hover:text-sky-400 duration-300 rounded-lg ${pathname == `/profile/${id}/following` ? "text-sky-400" : "md:hover:bg-zinc-100 md:hover:text-zinc-950"}`}>
            Following
        </Link>
        <p className="md:hidden">•</p>
        <Link 
          href={`/profile/${id}/pinned`} 
          className={`md:px-4 md:py-2 hover:text-sky-400 duration-300 rounded-lg ${pathname == `/profile/${id}/pinned` ? "text-sky-400" : "md:hover:bg-zinc-100 md:hover:text-zinc-950"}`}>
            Pinned
        </Link>
        <p className="md:hidden">•</p>
        <Link 
          href={`/profile/${id}/activity`} 
          className={`md:px-4 md:py-2 hover:text-sky-400 duration-300 rounded-lg ${pathname == `/profile/${id}/activity` ? "text-sky-400" : "md:hover:bg-zinc-100 md:hover:text-zinc-950"}`}>
            Activity
        </Link>
        <p className="md:hidden">•</p>
        <Link 
          href={`/profile/${id}/lists`} 
          className={`md:px-4 md:py-2 hover:text-sky-400 duration-300 rounded-lg ${pathname == `/profile/${id}/lists` ? "text-sky-400" : "md:hover:bg-zinc-100 md:hover:text-zinc-950"}`}>
            Lists
        </Link>
      </div>
    </>
  )
}