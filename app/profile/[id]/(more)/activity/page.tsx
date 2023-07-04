import { getUser } from "@/app/serverMethods";
import Activity from "@/components/profile/Activity";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata({ params }: { params: { id: string }, parent?: ResolvingMetadata}): Promise<Metadata> {
  const user = await getUser(params.id)
  return {
    title: `${user.name}'s activity`
  }
}

export default function ProfileActivity({ params }: { params: { id: string } }) {
  return <Activity id={params.id}/>
}