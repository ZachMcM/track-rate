import { getUser } from "@/app/serverMethods"
import Likes from "@/components/profile/Likes"
import { Metadata, ResolvingMetadata } from "next"

export async function generateMetadata({ params }: { params: { id: string }, parent?: ResolvingMetadata}): Promise<Metadata> {
  const user = await getUser(params.id)
  return {
    title: `${user.name}'s likes`
  }
}

export default function ProfileLikes({ params }: { params: { id: string }}) {
  return (
    <Likes id={params.id}/>
  )
}