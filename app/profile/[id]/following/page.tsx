import { getUser } from "@/app/serverMethods"
import FollowingList from "@/components/FollowingList"
import { Metadata, ResolvingMetadata } from "next"

export async function generateMetadata({ params }: { params: { id: string }, parent?: ResolvingMetadata}): Promise<Metadata> {
  const user = await getUser(params.id)
  return {
    title: `${user.name}'s following`
  }
}

export default function UserFollowing({ params }: { params: { id: string }}) {
  return (
    <FollowingList id={params.id}/>
  )
}
