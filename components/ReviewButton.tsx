'use client'

import { useSession } from "next-auth/react"
import { TbPlaylistAdd } from "react-icons/tb"
import { useContext } from "react"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { ReviewFormContext, ReviewFormProviderType } from "./ReviewFormProvider"

export default function ReviewButton() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const router = useRouter()

  const { 
    setReviewForm,
  } = useContext(ReviewFormContext) as ReviewFormProviderType

  const handleModalClick = () => {
    if (session) {
      setReviewForm(true)
    } else {
      router.push(`/signin?callbackUrl=${pathname}`)
    }
  }

  return (
    <>
      <button 
        className="flex space-x-2 items-center hover:opacity-80"
        onClick={handleModalClick}
      >
        <p className="hidden md:block">New</p>
        <TbPlaylistAdd className="text-2xl"/>
      </button>
    </>
  )
}