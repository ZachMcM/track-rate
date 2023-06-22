'use client'

import { FcGoogle } from "react-icons/fc"
import { BsSpotify } from "react-icons/bs"
import { signIn, useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function SignIn() {
  const { data: session } = useSession()

  if (session) {
    redirect("/")
  }

  return (
    <main className="fixed h-full w-full bg-gray-950 top-0 left-0 bottom-0 flex items-center justify-center">
      <div className="flex flex-col space-y-5">
        <h3 className="text-4xl font-bold text-center">Sign in to TrackRate</h3>
        <button 
            className="self-center font-semibold border border-gray-700 rounded-md w-fit p-3 flex space-x-10 items-center hover:opacity-80 duration-300"
            onClick={() => signIn("google")}
          >
            <FcGoogle className="text-2xl"/>
            <p>Sign in with Google</p>
            <div></div>
          </button>
      </div>
    </main>
  )
}