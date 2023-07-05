'use client'

import { ExtendedReview, ReviewFormProviderType } from "@/app/types";
import { useContext, useState } from "react";
import { TbCheck, TbChevronDown } from "react-icons/tb";
import { useDetectClickOutside } from "react-detect-click-outside";
import { useSession } from "next-auth/react"
import { useQuery } from "@tanstack/react-query";
import { getUserReviews } from "@/app/apiMethods";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ReviewFormContext } from "@/components/Provider";
import ReviewCard from "@/components/review/ReviewCard";

export default function Reviews({ params }: { params: { id: string } }) {
  const { data: user, isLoading } = useQuery({
    queryFn: () => getUserReviews(params.id),
    queryKey: ['user-reviews', { id: params.id }]
  })

  if (user && !isLoading) {
    return <ReviewList reviews={user.reviews}/>
  } else {
    return <LoadingSpinner/>
  }
}

function ReviewList({ reviews }: { reviews: ExtendedReview[] }) {
  const { data: session } = useSession()

  const {
    setSearchModal
  } = useContext(ReviewFormContext) as ReviewFormProviderType

  const [reviewArr, setReviewArr] = useState<ExtendedReview[]>(reviews)

  const reviewTypes: ReviewType[] = [
    "Album",
    "Track",
    "Artist",
    "All"
  ]

  const changeFilters = (thisType: ReviewType, thisSort: SortBy) => {
    console.log(sortBy, thisType)
    if (thisType == "All") {
      if (thisSort == "Date latest") {
        const sorted = reviews.sort((a: ExtendedReview, b: ExtendedReview) => {
          return (new Date(b.createdAt)).getTime() - (new Date(a.createdAt)).getTime()
        })
        setReviewArr(sorted)
      } else if (thisSort == "Date earliest") {
        const sorted = reviews.sort((a: ExtendedReview, b: ExtendedReview) => {
          return (new Date(a.createdAt)).getTime() - (new Date(b.createdAt)).getTime()
        })
        setReviewArr(sorted)
      } else if (thisSort == "Rating highest") {
        const sorted = reviews.sort((a: ExtendedReview, b: ExtendedReview) => {
          return b.rating - a.rating
        })
        setReviewArr(sorted)
      } else {
        const sorted = reviews.sort((a: ExtendedReview, b: ExtendedReview) => {
          return a.rating - b.rating
        })
        setReviewArr(sorted)
      }
    } else {
      const filtered = reviews.filter((review: ExtendedReview) => {
        return review.type == thisType.toLowerCase()
      })
      if (thisSort == "Date latest") {
        const sorted = filtered.sort((a: ExtendedReview, b: ExtendedReview) => {
          return (new Date(b.createdAt)).getTime() - (new Date(a.createdAt)).getTime()
        })
        setReviewArr(sorted)
      } else if (thisSort == "Date earliest") {
        const sorted = filtered.sort((a: ExtendedReview, b: ExtendedReview) => {
          return (new Date(a.createdAt)).getTime() - (new Date(b.createdAt)).getTime()
        })
        setReviewArr(sorted)
      } else if (thisSort == "Rating highest") {
        const sorted = filtered.sort((a: ExtendedReview, b: ExtendedReview) => {
          return b.rating - a.rating
        })
        setReviewArr(sorted)
      } else {
        const sorted = filtered.sort((a: ExtendedReview, b: ExtendedReview) => {
          return a.rating - b.rating
        })
        setReviewArr(sorted)
      }
    }
  }

  type ReviewType = "Album" | "Track" | "Artist" | "All"

  const typeDropdownRef = useDetectClickOutside({ onTriggered: () => setTypeDropdown(false) })

  const [reviewType, setReviewType] = useState<ReviewType>('All')
  const [typeDropdown, setTypeDropdown] = useState<boolean>(false)

  const sortBys: SortBy[] = [
    "Date latest",
    "Date earliest",
    "Rating highest",
    "Rating lowest"
  ]

  const sortDropdownRef = useDetectClickOutside({ onTriggered: () => setSortDropdown(false)})

  const [sortBy, setSortBy] = useState<SortBy>("Date latest")
  const [sortDropdown, setSortDropdown] = useState<boolean>(false)

  type SortBy = "Date latest" | "Date earliest" | "Rating highest" | "Rating lowest"

  return ( 
    <div className="flex flex-col space-y-3">
      <p className="font-medium text-lg">Reviews</p>
      <div className="flex flex-col-reverse md:space-y-0 md:flex-row md:space-x-8 items-start w-full">
        {
          reviewArr.length != 0 ?
          <div className="flex flex-col mt-10 md:mt-0 bg-white drop-shadow-lg border border-zinc-200 rounded-lg basis-2/3">
            {
              reviewArr.map((review: ExtendedReview) => {
                return <ReviewCard review={review}/>
              })
            }
          </div>
          :
          <div className="flex px-5 py-10 bg-white rounded-lg drop-shadow-lg border border-zinc-200 justify-center items-center basis-2/3">
            <p className="text-zinc-500 text-sm">No reviews</p>
          </div>
        }
        <div className="flex flex-col space-y-8 justify-start w-full basis-1/3">
        {
          session &&
          <button 
            className="p-4 rounded-lg drop-shadow-lg border border-zinc-200 w-full bg-white font-medium text-center hover:opacity-80 duration-300"
            onClick={() => setSearchModal(true)}
          >
            <p>New Review</p>
          </button>
        }
          <div className="flex flex-col space-y-3">
            <p className="font-medium text-lg">Filters</p>
            <div className="flex flex-col bg-white drop-shadow-lg border border-zinc-200 rounded-lg">
              <button 
                className="flex justify-between items-center p-4 hover:opacity-80 duration-300"
                onClick={() => setSortDropdown(!sortDropdown)}
              >
                <p className="text-zinc-500 ">Sort by</p>
                <div className="flex space-x-2 font-medium items-center">
                  <p>{sortBy}</p>
                  <TbChevronDown/>
                </div>
              </button>
              <div ref={sortDropdownRef} className={`${!sortDropdown ? "h-0" : "h-48"} border-t overflow-hidden duration-300 border-zinc-200 flex flex-col items-start`}>
                {
                  sortBys.map((sort: SortBy) => {
                    return (
                      <button
                        className="text-zinc-500 py-3 hover:text-zinc-950 duration-300 flex px-4 space-x-2 items-center"
                        onClick={() => {
                          setSortBy(sort)
                          changeFilters(reviewType, sort)
                        }}
                      >
                        { sort == sortBy && <TbCheck className="text-green-400"/>}
                        <p className={`text-sm ${sortBy == sort && "text-zinc-950"}`}>{sort}</p>
                      </button>
                    )
                  })
                }
              </div>
            </div>
            <div className="flex flex-col bg-white drop-shadow-lg border border-zinc-200 rounded-lg">
              <button 
                className="flex justify-between items-center p-4 hover:opacity-80 duration-300"
                onClick={() => setTypeDropdown(!typeDropdown)}
              >
                <p className="text-zinc-500 ">Type</p>
                <div className="flex space-x-2 font-medium items-center">
                  <p>{reviewType}</p>
                  <TbChevronDown/>
                </div>
              </button>
              <div ref={typeDropdownRef} className={`${!typeDropdown ? "h-0" : "h-48"} border-t overflow-hidden duration-300 border-zinc-200 flex flex-col items-start`}>
                {
                  reviewTypes.map((thisType: ReviewType) => {
                    return (
                      <button 
                        className="text-zinc-500 py-3 hover:text-zinc-950 duration-300 flex px-4 space-x-2 items-center"
                        onClick={() => {
                          setReviewType(thisType)
                          changeFilters(thisType, sortBy)
                        }}
                      >
                        { thisType == reviewType && <TbCheck className="text-green-400"/>}
                        <p className={`text-sm ${thisType == reviewType && "text-zinc-950"}`}>{thisType}</p>
                      </button>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>        
      </div>
    </div> 
  )
}