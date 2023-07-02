import { getUser } from "@/app/serverMethods"
import ProfilePage from "@/components/ProfilePage"
import { Metadata, ResolvingMetadata } from "next"

export async function generateMetadata({ params }: { params: { id: string }, parent?: ResolvingMetadata}): Promise<Metadata> {
  const user = await getUser(params.id)
  return {
    title: `${user.name}'s profile`
  }
}

export default function Profile({ params }: { params: { id: string }}) {
  return (
    <ProfilePage id={params.id}/>
  )
}
