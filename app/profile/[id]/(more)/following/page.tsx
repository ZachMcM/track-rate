import { getUser } from "@/app/serverMethods"
import { Props } from "@/app/types"
import Following from "@/components/profile/Following"
import { Metadata, ResolvingMetadata } from "next"

export async function generateMetadata(
  { params, searchParams }: Props,
  parent?: ResolvingMetadata
): Promise<Metadata>  {
  const user = await getUser(params.id)
  return {
    title: `${user.name}'s following`
  }
}

export default function UserFollowing({ params }: { params: { id: string }}) {
  return (
    <Following id={params.id}/>
  )
}
