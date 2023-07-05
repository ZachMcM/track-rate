import { getUser } from "@/app/serverMethods"
import { Props } from "@/app/types"
import Followers from "@/components/profile/Followers"
import { Metadata, ResolvingMetadata } from "next"

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata>  {
  const user = await getUser(params.id)
  return {
    title: `${user.name}'s followers`
  }
}

export default function UserFollowers({ params }: { params: { id: string }}) {
  return (
    <Followers id={params.id}/>
  )
}
