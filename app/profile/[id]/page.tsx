import { getUser } from "@/app/serverMethods"
import { Suspense } from "react"

export default function Profile({ params }: { params: { id: string }}) {
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
    <div>

    </div>
  )
}