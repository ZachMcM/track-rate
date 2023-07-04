import { getUser } from "@/app/serverMethods"
import Reviews from "@/components/profile/Reviews"
import ProfileReviewList from "@/components/profile/Reviews"
import { Metadata, ResolvingMetadata } from "next"

export async function generateMetadata({ params }: { params: { id: string }, parent?: ResolvingMetadata}): Promise<Metadata> {
  const user = await getUser(params.id)
  return {
    title: `${user.name}'s reviews`
  }
}

export default function ProfileReviews({ params }: { params: { id: string }}) {

  return (  
    <Reviews id={params.id}/>
  )
}