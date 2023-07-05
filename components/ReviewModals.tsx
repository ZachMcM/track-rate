'use client'

import { useContext } from "react"
import { ReviewFormContext } from "./Provider"
import { ReviewFormProviderType } from "@/app/types"
import ReviewForm from "./ReviewForm"
import ReviewSearch from "./ReviewSearch"

export default function ReviewModals() {
  const { reviewForm, searchModal } = useContext(ReviewFormContext) as ReviewFormProviderType

  return (
    <>
      { reviewForm && <ReviewForm/>}
      { searchModal && <ReviewSearch/> }
    </>
  )
}