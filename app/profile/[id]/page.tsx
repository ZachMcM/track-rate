import { Suspense } from "react"

const getUser = async (id: string) => {
  const res = await fetch(`${process.env.URL}/api/user?id=${id}`)
  const data = await res.json()
  return data
}

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