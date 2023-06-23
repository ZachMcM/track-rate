'use client'

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { redirect } from "next/navigation"
import Image from "next/image"
import { TbArrowBarToRight } from "react-icons/tb"
import { usePathname } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { getUserData } from "@/app/apiMethods"

export default function ProfileDashboard({ id }: { id: string }) {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("signin?callbackUrl=/")
    }
  })

  const pathname = usePathname()
  const userDataQuery = useQuery({ queryKey: ["user", id], queryFn: () => getUserData(id)})

  return (
    <div className="flex flex-col space-y-5 p-5 md:pt-20 md:px-36 lg:px-48 2xl:px-64">
      {
        userDataQuery.isLoading ?
        <div className="flex space-x-5 items-center">
          <div className="bg-gray-700 h-24 w-24 rounded-full animate-pulse"></div>
          <div className="flex flex-col space-y-3">
            <div className="bg-gray-700 rounded-full animate-pulse w-48 h-4"></div>
            <div className="bg-gray-700 rounded-full animate-pulse w-36 h-4"></div>
          </div>
        </div> :
        <div className="flex space-x-5 items-center">
          <div className="w-16 h-16 md:w-24 md:h-24 relative">
            <Image
              src={userDataQuery.data?.image || ""}
              fill
              alt="avatar"
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col space-y-3">
            <p className="font-bold text-lg">{userDataQuery.data?.name}</p>
            {
              userDataQuery.data?.email == session?.user?.email &&
              <div className="flex space-x-3">
                <Link 
                  href="/user-settings" 
                  className="text-xs md:text-sm border-gray-700 border rounded-md py-2 px-4 font-semibold flex justify-center items-center hover:opacity-80 duration-300"
                >
                  <p>Edit Profile</p>
                </Link>
                <button 
                  onClick={() => signOut()}
                  className="text-xs md:text-sm border-gray-700 border flex items-center space-x-2 rounded-md py-2 px-4 font-semibold hover:opacity-80 duration-300"
                >
                  <p>Sign Out</p>
                  <TbArrowBarToRight className="text-xl"/>
                </button>
              </div>
            }
          </div>
        </div>
      }
      <div className="justify-around border text-xs md:text-sm border-gray-700 rounded-md flex items-center font-medium">
        <Link 
          className={`rounded-md m-2 p-2 
          hover:bg-gray-700 duration-300 ${pathname == `/profile/${userDataQuery.data?.id}` && "bg-gray-700"}`} 
          href={`/profile/${userDataQuery.data?.id}`}
        >
          Profile
        </Link>
        {/* Todo */}
        <Link 
          className={`rounded-md m-2 p-2 hover:bg-gray-700 duration-300 ${pathname == `/profile/${userDataQuery.data?.id}/activity` && "bg-gray-700"}`} 
          href={`/profile/${userDataQuery.data?.id}/activity`}
        >
          Activity
        </Link>
        {/* Todo */}
        <Link 
          className={`rounded-md m-2 p-2 hover:bg-gray-700 duration-300 ${pathname == `/profile/${userDataQuery.data?.id}/reviews` && "bg-gray-700"}`} 
          href={`/profile/${userDataQuery.data?.id}/reviews`}
        >
          Reviews
        </Link>
        {/* Todo */}
        <Link 
          className={`rounded-md m-2 p-2 hover:bg-gray-700 duration-300 ${pathname == `/profile/${userDataQuery.data?.id}/likes` && "bg-gray-700"}`} 
          href={`/profile/${userDataQuery.data?.id}/likes`}
        >
          Likes
        </Link>
      </div>
    </div>
  )
}