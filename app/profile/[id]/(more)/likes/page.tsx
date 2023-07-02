import { getUser } from "@/app/serverMethods"
import UserLikesContent from "@/components/UserLikesContent"
import { Metadata, ResolvingMetadata } from "next"

export async function generateMetadata({ params }: { params: { id: string }, parent?: ResolvingMetadata}): Promise<Metadata> {
  const user = await getUser(params.id)
  return {
    title: `${user.name}'s likes`
  }
}

export default function UserLikes({ params }: { params: { id: string }}) {
  return (
    <UserLikesContent id={params.id}/>
  )
}