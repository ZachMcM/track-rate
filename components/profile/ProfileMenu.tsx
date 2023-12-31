'use client'

import Image from "next/image"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { usePathname } from "next/navigation"
import { getUser } from "@/app/apiMethods"

export default function ProfileMenu({ id }: { id: string }) {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user', { id: id }],
    queryFn: () => getUser(id)
  })

  const pathname = usePathname()

  return (
    <nav className="bg-white drop-shadow-md dark:bg-zinc-900 rounded-lg flex flex-col space-y-3 md:flex-row md:space-y-0 items-start md:space-x-3 p-4 md:items-center">
      <div className="flex space-x-3 items-center">
        {
          user && !isLoading ?
          <>
            <Link href={`/profile/${id}`} className="h-9 w-9 relative shrink-0 hover:opacity-80 duration-300 rounded-full">
              <div className="drop-shadow-md animate-pulse w-full h-full absolute inset-0 rounded-full"></div> :
                <Image
                  src={user?.image || ""}
                  fill
                  alt="avatar"
                  className="rounded-full drop-shadow-md"
                />
            </Link>
            <Link href={`/profile/${id}`} className="font-medium hover:opacity-70 duration-300">{user.name}</Link>     
          </> :
          <>
            <div className="bg-zinc-200 dark:bg-zinc-800 drop-shadow-md animate-pulse rounded-full h-9 w-9"></div>
            <div className="h-4 w-32 rounded-lg dark:bg-zinc-800 bg-zinc-200 animate-pulse"></div>
          </>
        }
      </div>      
      <div className="flex md:items-center gap-2 md:gap-0 flex-wrap items-start md:space-y-0 md:space-x-1 text-zinc-500 text-sm font-normal md:text-zinc-950 md:font-medium md:text-base">
        <Link 
          href={`/profile/${id}/reviews`} 
          className={`md:px-4 md:py-2 hover:text-zinc-950 duration-300 rounded-lg ${pathname == `/profile/${id}/reviews` ? "text-zinc-950 dark:text-white" : "md:hover:bg-zinc-100 dark:text-zinc-500 dark:md:hover:bg-zinc-800 dark:md:hover:text-white md:hover:text-zinc-950"}`}>
            Reviews
        </Link>
        <p className="md:hidden">•</p>
        <Link 
          href={`/profile/${id}/likes`} 
          className={`md:px-4 md:py-2 hover:text-zinc-950 duration-300 rounded-lg ${pathname == `/profile/${id}/likes` ? "text-zinc-950 dark:text-white" : "md:hover:bg-zinc-100 dark:text-zinc-500 dark:md:hover:bg-zinc-800 dark:md:hover:text-white md:hover:text-zinc-950"}`}>
            Likes
        </Link>
        <p className="md:hidden">•</p>
        <Link 
          href={`/profile/${id}/followers`} 
          className={`md:px-4 md:py-2 hover:text-zinc-950 duration-300 rounded-lg ${pathname == `/profile/${id}/followers` ? "text-zinc-950 dark:text-white" : "md:hover:bg-zinc-100 dark:text-zinc-500 dark:md:hover:bg-zinc-800 dark:md:hover:text-white md:hover:text-zinc-950"}`}>
            Followers
        </Link>
        <p className="md:hidden">•</p>
        <Link 
          href={`/profile/${id}/following`} 
          className={`md:px-4 md:py-2 hover:text-zinc-950 duration-300 rounded-lg ${pathname == `/profile/${id}/following` ? "text-zinc-950 dark:text-white" : "md:hover:bg-zinc-100 dark:text-zinc-500 dark:md:hover:bg-zinc-800 dark:md:hover:text-white md:hover:text-zinc-950"}`}>
            Following
        </Link>
        <p className="md:hidden">•</p>
        <Link 
          href={`/profile/${id}/pinned`} 
          className={`md:px-4 md:py-2 hover:text-zinc-950 duration-300 rounded-lg ${pathname == `/profile/${id}/pinned` ? "text-zinc-950 dark:text-white" : "md:hover:bg-zinc-100 dark:text-zinc-500 dark:md:hover:bg-zinc-800 dark:md:hover:text-white md:hover:text-zinc-950"}`}>
            Pinned
        </Link>
        <p className="md:hidden">•</p>
        <Link 
          href={`/profile/${id}/activity`} 
          className={`md:px-4 md:py-2 hover:text-zinc-950 duration-300 rounded-lg ${pathname == `/profile/${id}/activity` ? "text-zinc-950 dark:text-white" : "md:hover:bg-zinc-100 dark:text-zinc-500 dark:md:hover:bg-zinc-800 dark:md:hover:text-white md:hover:text-zinc-950"}`}>
            Activity
        </Link>
        <p className="md:hidden">•</p>
        {/* <Link 
          href={`/profile/${id}/lists`} 
          className={`md:px-4 md:py-2 hover:text-sky-400 duration-300 rounded-lg ${pathname == `/profile/${id}/lists` ? "text-sky-400" : "md:hover:bg-zinc-100 md:hover:text-zinc-950"}`}>
            Lists
        </Link> */}
      </div>
    </nav>

  )
}