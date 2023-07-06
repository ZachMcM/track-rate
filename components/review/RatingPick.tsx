'use client'

import { Dispatch, SetStateAction } from "react";
import { TbStar, TbStarFilled } from "react-icons/tb";

export default function RatingPick({ rating, setRating }: { rating: number, setRating: Dispatch<SetStateAction<number>> }) {
  console.log(rating)

  return (
    <div className="flex flex-col space-y-2">
      <p className="font-medium">Rating</p>
      <div className="flex items-center space-x-2 text-2xl">
        {
          Array(5).fill("").map((s: string, i: number) => {
            return (
              <button
                onClick={() => {
                  if (rating == i + 1) {
                    setRating(i)
                  } else {
                    setRating(i + 1)
                  }
                }}
              >
                { rating >= i + 1 ? <TbStarFilled className="text-zinc-500"/> : <TbStar className="text-zinc-500"/>}
              </button>
            )
          })
        }
      </div>
    </div>
  )
}