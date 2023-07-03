import { getUser } from "@/app/serverMethods"
import { FullReview } from "@/app/types"
import ProfileReviewList from "@/components/profile/ProfileReviewList"


export default async function ProfileReviews({ params }: { params: { id: string }}) {
  const user = await getUser(params.id)

  return (  
    <ProfileReviewList reviews={user.reviews}/>
  )
}