
const getUser = async (id: string) => {
  const res = await fetch(`${process.env.URL}/api/user?id=${id}`)
  const data = await res.json()
  return data
}

export default async function Profile({ params }: { params: { id: string }}) {
  const user = await getUser(params.id)

  return (
    <div></div>
  )
}