'use client'

import { FullReview } from "@/app/types";
import LoadingSpinner from "./LoadingSpinner";
import ReviewCard from "./ReviewCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";

export default function ReviewFeed({ initialReviews }: { initialReviews: FullReview[]}) {
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
    <ul className="flex flex-col space-y-8">
      {
        reviews.map((review: FullReview, i: number) => {
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
        <LoadingSpinner/>
      }
    </ul>
  )
}