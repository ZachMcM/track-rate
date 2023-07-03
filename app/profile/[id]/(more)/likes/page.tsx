import { getUser } from "@/app/serverMethods"
import { ExtendeLike } from "@/app/types"
import ReviewCard from "@/components/review/ReviewCard"
import { Metadata, ResolvingMetadata } from "next"

export async function generateMetadata({ params }: { params: { id: string }, parent?: ResolvingMetadata}): Promise<Metadata> {
  const user = await getUser(params.id)
  return {
    title: `${user.name}'s likes`
  }
}

export default async function ProfileLikes({ params }: { params: { id: string }}) {
  const user = await getUser(params.id)

  return (
    <div className="flex flex-col space-y-3">
      <p className="font-medium text-lg">Likes</p>  
      {
        user.likes.length != 0 ?
        <div className="flex flex-col bg-white drop-shadow-lg rounded-lg">
          {
            user.likes
            .map((like: ExtendeLike) => {
              return (
                <ReviewCard review={like.review}/>
              )
            })
          }
        </div> : 
        <div className="flex px-5 py-10 bg-white rounded-md justify-center items-center drop-shadow-lg">
          <p className="text-zinc-500 text-sm">No likes</p>
        </div>
      }
    </div>
  )
}