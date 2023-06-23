'use client'

import { Dispatch, SetStateAction } from "react";
import { TbStar, TbStarFilled, TbStarHalf, TbStarHalfFilled } from "react-icons/tb";

export default function Stars({ rating, setRating }: { rating: number, setRating: Dispatch<SetStateAction<number>> }) {
  return (
    <div className="flex flex-col space-y-2">
    <p className="font-medium text-xs md:text-sm">Rating</p>
    <div className="flex items-center space-x-2 text-lg md:text-xl text-gray-400">
      <button 
        onClick={() => {
          if (rating == 1) {
            setRating(0)
          } else {
            setRating(1)
          }
        }}
      >
        { rating >= 1 ? <TbStarFilled/> : <TbStar/>}
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
        { rating >= 2 ? <TbStarFilled/> : <TbStar/>}
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
        { rating >= 3 ? <TbStarFilled/> : <TbStar/>}
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
        { rating >= 4 ? <TbStarFilled/> : <TbStar/>}
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
        { rating >= 5 ? <TbStarFilled/> : <TbStar/>}
      </button>
    </div>
  </div>
  )
}