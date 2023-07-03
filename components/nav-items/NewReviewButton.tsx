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
      className="flex space-x-2 items-center p-2.5 bg-zinc-200 drop-shadow-sm rounded-full hover:bg-zinc-300 duration-300"
      onClick={handleModalClick}
    >
      <TbPlus className="text-xl"/>
    </button>
  )
}