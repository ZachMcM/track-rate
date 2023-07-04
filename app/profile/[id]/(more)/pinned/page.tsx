import { getUser } from "@/app/serverMethods"
import Pinned from "@/components/profile/Pinned"
import { Metadata, ResolvingMetadata } from "next"

export async function generateMetadata({ params }: { params: { id: string }, parent?: ResolvingMetadata}): Promise<Metadata> {
  const user = await getUser(params.id)
  return {
    title: `${user.name}'s likes`
  }
}

export default function ProfilePinned({ params }: { params: { id: string }}) {
  return <Pinned id={params.id}/>
}