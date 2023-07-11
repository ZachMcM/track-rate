'use client'

import { useContext } from "react"
import { ReviewFormContext } from "../Provider"
import { ReviewFormProviderType } from "@/app/types"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default function ReviewClientButton() {
  const router = useRouter()

  const { setSearchModal } = useContext(ReviewFormContext) as ReviewFormProviderType
  const { data: session } = useSession()

  return (
    <button 
      className="bg-sky-400 py-2.5 px-3 w-full text-white font-medium rounded-lg duration-300 hover:opacity-80"
      onClick={() => {
        if (session) {
          setSearchModal(true)
        } else {
          router.push("/signin")
        }
      }}
    >
      <p>{session ? "Create A Review" : "Sign In"}</p>
    </button>
  )
}