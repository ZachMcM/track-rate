import { TbStar, TbStarFilled } from "react-icons/tb"
import { uid } from "uid"

export default function RatingDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex items-center space-x-1">
      {
        Array(5).fill("").map((s: string, i: number) => {
          if (rating >= i + 1) {
            return <TbStarFilled className="text-yellow-500" key={uid()}/>
          } else {
            return <TbStarFilled className="text-zinc-300" key={uid()}/>
          }
        })
      }
    </div>
  )
}