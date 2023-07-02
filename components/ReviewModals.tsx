'use client'

import { useContext } from "react"
import { ReviewFormContext } from "./Provider"
import { ReviewFormProviderType } from "@/app/types"
import ReviewForm from "./ReviewForm"
import SearchModal from "./SearchModal"

export default function ReviewModals() {
  const { reviewForm, searchModal } = useContext(ReviewFormContext) as ReviewFormProviderType

  return (
    <>
      { reviewForm && <ReviewForm/>}
      { searchModal && <SearchModal/> }
    </>
  )
}