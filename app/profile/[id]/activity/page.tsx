import { FullUser } from "@/app/types"
import ActivityCard from "@/components/ActivityCard"
import { Activity } from "@prisma/client"
import { Suspense } from "react"

const getUser = async (id: string): Promise<FullUser> => {
  const res = await fetch(`${process.env.URL}/api/user?id=${id}`)
  const data = await res.json()
  return data
}

export default function Activity({ params }: { params: { id: string }}) {

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
              <p className="p-8 rounded-md border border-gray-700 text-xs md:text-sm text-gray-400"><ActivityCard activity={activity} key={activity.id}/></p>
              
            )
          }
        })
      }
    </div>
  )
}