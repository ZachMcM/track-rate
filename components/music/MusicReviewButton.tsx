'use client'

import { useContext } from "react"
import { ReviewFormContext } from "../Provider"
import { ReviewFormParams, ReviewFormProviderType } from "@/app/types"

export default function MusicReviewButton({ type, data, className }: { type: string, data: ReviewFormParams, className: string }) {
  
  const { setItemData, setReviewForm } = useContext(ReviewFormContext) as ReviewFormProviderType

  return (
    <button
      className={className}
      onClick={() => {
        setItemData(data)
        setReviewForm(true)
      }}
    >
      <p className="capitalize">Review This {type}</p>
    </button>
  )
}