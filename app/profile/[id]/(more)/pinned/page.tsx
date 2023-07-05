import { getUser } from "@/app/serverMethods"
import { Props } from "@/app/types"
import Pinned from "@/components/profile/Pinned"
import { Metadata, ResolvingMetadata } from "next"

export async function generateMetadata(
  { params, searchParams }: Props,
  parent?: ResolvingMetadata
): Promise<Metadata>  {
  const user = await getUser(params.id)
  return {
    title: `${user.name}'s likes`
  }
}

export default function ProfilePinned({ params }: { params: { id: string }}) {
  return <Pinned id={params.id}/>
}