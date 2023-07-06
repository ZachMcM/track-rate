'use client'

import { ExtendedReview, ReviewFormProviderType } from "@/app/types";
import LoadingSpinner from "../LoadingSpinner";
import ReviewCard from "./ReviewCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useContext, useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import { useSession } from "next-auth/react"
import { ReviewFormContext } from "../Provider";

export default function ReviewFeed({ initialReviews }: { initialReviews: ExtendedReview[]}) {
  const { data: session } = useSession()

  const {
    setSearchModal
  } = useContext(ReviewFormContext) as ReviewFormProviderType

  const lastReviewRef = useRef<HTMLElement>(null)
  const { ref, entry } = useIntersection({
    root: lastReviewRef.current,
    threshold: 1
  })

  const {
    data,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['infinite scroll'],
    queryFn: async ({ pageParam = 1}) => {
      const res = await fetch('/api/reviews?cursor=' + pageParam)
      const data = await res.json()
      return data
    },
    getNextPageParam: (_, pages) => {
      return pages.length + 1
    },
    initialData: {
      pages: [initialReviews],
      pageParams: [1]
    }
  })

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage()
    }
  }, [entry, fetchNextPage])


  const reviews = data?.pages.flatMap((page) => page) ?? initialReviews

  return (
    <ul className="flex basis-2/3 flex-col dark:bg-zinc-900 bg-white drop-shadow-md rounded-lg w-full">
      {
        reviews.map((review: ExtendedReview, i: number) => {
          if (i === reviews.length - 3) {
            return (
              <li ref={ref} key={review.id}><ReviewCard review={review}/></li>
            )
          } else {
            return <ReviewCard key={review.id} review={review}/>
          }
        })
      }
      {
        isFetchingNextPage &&
        <div className="p-5">
          <LoadingSpinner/>
        </div>
      }
    </ul>
  )
}