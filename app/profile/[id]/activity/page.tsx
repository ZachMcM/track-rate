import { getUser } from "@/app/serverMethods"
import ActivityCard from "@/components/ActivityCard"
import { Activity } from "@prisma/client"
import { Suspense } from "react"

export default function UserActivity({ params }: { params: { id: string }}) {

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

  return (
    <div className="flex flex-col space-y-8">
      {
        user.acivities.map((activity: Activity) => {
          if (activity.otherUserId != activity.userId) {
            return (
              <div className="flex flex-col space-y-5 p-8 rounded-md border border-gray-700 text-xs md:text-sm text-gray-400">
                <p>
                  <ActivityCard activity={activity} key={activity.id}/>
                </p>
                <p className="text-gray-400 text-xs">{(new Date(activity.createdAt).toDateString())}</p>
              </div>
            )
          }
        })
      }
    </div>
  )
}