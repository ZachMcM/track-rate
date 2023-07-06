'use client'

import { useContext } from "react"
import { ReviewFormContext } from "../Provider"
import { ReviewFormProviderType } from "@/app/types"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import { TbCirclePlus } from "react-icons/tb"

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
      className="p-1.5 md:p-2.5 flex space-x-2 items-center font-medium bg-zinc-950 dark:bg-white dark:text-zinc-950 text-white rounded-lg hover:opacity-80 duration-300"
      onClick={handleModalClick}
    >
      <TbCirclePlus className="text-2xl md:text-xl"/>
      <p className="hidden md:block">New Review</p>
    </button>
  )
}