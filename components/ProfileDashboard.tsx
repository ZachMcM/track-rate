'use client'

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { redirect } from "next/navigation"
import Image from "next/image"
import { TbArrowBarToRight } from "react-icons/tb"
import { usePathname } from "next/navigation"

export default function ProfileDashboard() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("signin?callbackUrl=/")
    }
  })

  const pathname = usePathname()

  return (
    <div className="flex flex-col space-y-5 p-5 md:pt-20 md:px-48 lg:px-64">
      {
        session && session.user && session.user.name && session.user.image ?
        <div className="flex space-x-5 items-center">
          <Image
            src={session.user.image}
            height={100}
            width={100}
            alt="avatar"
            className="rounded-full"
          />
          <div className="flex flex-col space-y-3">
            <p className="font-bold text-lg">{session.user.name}</p>
            <div className="flex space-x-3">
              <Link 
                href="/profile/settings" 
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
          </div>
        </div> :
        <div className="flex space-x-5 items-center">
          <div className="bg-gray-700 h-24 w-24 rounded-full animate-pulse"></div>
          <div className="flex flex-col space-y-3">
            <div className="bg-gray-700 rounded-full animate-pulse w-48 h-4"></div>
            <div className="bg-gray-700 rounded-full animate-pulse w-36 h-4"></div>
          </div>
        </div>
      }
      <div className="justify-around border text-xs md:text-sm border-gray-700 rounded-md flex items-center font-medium">
        <Link className={`md:block hidden rounded-md m-2 p-2 hover:bg-gray-700 duration-300 ${pathname.replace("/profile/", "") == "settings" && "bg-gray-700"}`} href="/profile/settings">Settings</Link>
        <Link className={`rounded-md m-2 p-2 hover:bg-gray-700 duration-300 ${pathname == "/profile" && "bg-gray-700"}`} href="/profile">Profile</Link>
        {/* Todo */}
        <Link className={`rounded-md m-2 p-2 hover:bg-gray-700 duration-300 ${pathname.replace("/profile/", "") == "activity" && "bg-gray-700"}`} href="/profile/activity">Activity</Link>
        {/* Todo */}
        <Link className={`rounded-md m-2 p-2 hover:bg-gray-700 duration-300 ${pathname.replace("/profile/", "") == "reviews" && "bg-gray-700"}`} href="/profile/reviews">Reviews</Link>
        {/* Todo */}
        <Link className={`rounded-md m-2 p-2 hover:bg-gray-700 duration-300 ${pathname.replace("/profile/", "") == "likes" && "bg-gray-700"}`} href="/profile/likes">Likes</Link>
      </div>
    </div>
  )
}