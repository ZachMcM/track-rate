import { TbStar, TbStarFilled } from "react-icons/tb"
import { uid } from "uid"

export default function RatingDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex items-center space-x-2 text-lg md:text-xl text-gray-400">
      {
        Array(5).fill("").map((s: string, i: number) => {
          if (rating >= i) {
            return <TbStarFilled key={uid()}/>
          } else {
            return <TbStar key={uid()}/>
          }
        })
      }
    </div>
  )
}