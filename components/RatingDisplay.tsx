import { TbStar, TbStarFilled } from "react-icons/tb"
import { uid } from "uid"

export default function RatingDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex items-center space-x-1 text-xl text-zinc-400">
      {
        Array(5).fill("").map((s: string, i: number) => {
          if (rating >= i + 1) {
            return <TbStarFilled key={uid()}/>
          } else {
            return <TbStar key={uid()}/>
          }
        })
      }
    </div>
  )
}