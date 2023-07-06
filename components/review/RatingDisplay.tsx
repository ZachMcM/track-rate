import { TbStar, TbStarFilled } from "react-icons/tb"
import { uid } from "uid"

export default function RatingDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex items-center space-x-1">
      {
        Array(5).fill("").map((s: string, i: number) => {
          if (rating >= i + 1) {
            return <TbStarFilled className="text-zinc-500 dark:text-zinc-400" key={uid()}/>
          } else {
            return <TbStar className="text-zinc-500 dark:text-zinc-400" key={uid()}/>
          }
        })
      }
    </div>
  )
}