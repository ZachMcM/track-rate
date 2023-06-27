import { getUser } from "@/app/serverMethods";
import { FullReview } from "@/app/types";
import { Review } from "@prisma/client";
import { Suspense } from "react";
import ReviewCard from "@/components/ReviewCard";

export default function UserActivity({ params }: { params: { id: string } }) {
  return (
    <div>
      <Suspense>
        <PageContent id={params.id}/>
      </Suspense>
    </div>
  )
}

async function PageContent({ id }: { id: string }) {
  const user = await getUser(id)
  console.log(user.reviews)

  return (
    <div className="flex flex-col space-y-8">
      {
        user.reviews.map((review: Review) => {
          return <Suspense><ReviewCard review={review}/></Suspense>
        })
      }
    </div>
  )
}