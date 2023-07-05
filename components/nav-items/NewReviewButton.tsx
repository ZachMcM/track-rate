'use client'

import { useContext } from "react"
import { ReviewFormContext } from "../Provider"
import { ReviewFormProviderType } from "@/app/types"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import { TbPlus } from "react-icons/tb"

export default function NewReviewButton() {
  const { 
    setSearchModal,
  } = useContext(ReviewFormContext) as ReviewFormProviderType

  const { data: session } = useSession()

  const router = useRouter()
  const pathname = usePathname()

  const handleModalClick = () => {
    if (session) {
      setSearchModal(true)
    } else {
      router.push(`/signin?callbackUrl=${pathname}`)
    }
  }

  return (
    <button 
      className="p-2.5 font-medium border border-zinc-200 drop-shadow-lg bg-zinc-100 rounded-lg hover:opacity-80 duration-300"
      onClick={handleModalClick}
    >
      <TbPlus className="text-xl"/>
    </button>
  )
}