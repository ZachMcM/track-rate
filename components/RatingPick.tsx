'use client'

import { Dispatch, SetStateAction } from "react";
import { TbStarFilled } from "react-icons/tb";

export default function RatingPick({ rating, setRating }: { rating: number, setRating: Dispatch<SetStateAction<number>> }) {
  console.log(rating)

  return (
    <div className="flex flex-col space-y-2">
      <p className="font-medium">Rating</p>
      <div className="flex items-center space-x-2 text-2xl">
        <button 
          onClick={() => {
            if (rating == 1) {
              setRating(0)
            } else {
              setRating(1)
            }
          }}
        >
          { rating >= 1 ? <TbStarFilled className="text-yellow-500"/> : <TbStarFilled className="text-zinc-300"/>}
        </button>
        <button 
          onClick={() => {
            if (rating == 2) {
              setRating(1)
            } else {
              setRating(2)
            }
          }}
        >
          { rating >= 2 ? <TbStarFilled className="text-yellow-500"/> : <TbStarFilled className="text-zinc-300"/>}
        </button>
        <button 
          onClick={() => {
            if (rating == 3) {
              setRating(2)
            } else {
              setRating(3)
            }
          }}
        >
          { rating >= 3 ? <TbStarFilled className="text-yellow-500"/> : <TbStarFilled className="text-zinc-300"/>}
        </button>
        <button 
          onClick={() => {
            if (rating == 4) {
              setRating(3)
            } else {
              setRating(4)
            }
          }}
        >
          { rating >= 4 ? <TbStarFilled className="text-yellow-500"/> : <TbStarFilled className="text-zinc-300"/>}
        </button>
        <button 
          onClick={() => {
            if (rating == 5) {
              setRating(4)
            } else {
              setRating(5)
            }
          }}
        >
          { rating >= 5 ? <TbStarFilled className="text-yellow-500"/> : <TbStarFilled className="text-zinc-300"/>}
        </button>
      </div>
    </div>
  )
}