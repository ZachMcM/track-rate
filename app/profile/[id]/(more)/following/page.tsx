import { getUser } from "@/app/serverMethods"
import { UserExtendedFollowers } from "@/app/types"
import UserListItem from "@/components/UserListItem"
import { Metadata, ResolvingMetadata } from "next"

export async function generateMetadata({ params }: { params: { id: string }, parent?: ResolvingMetadata}): Promise<Metadata> {
  const user = await getUser(params.id)
  return {
    title: `${user.name}'s following`
  }
}

export default async function UserFollowing({ params }: { params: { id: string }}) {
  const user = await getUser(params.id)

  return (
    <div className="flex flex-col space-y-3">
      <p className="font-medium text-lg">Following</p>
      {
        user.follows.length != 0 ?       
        <div className="flex flex-col space-y-8 bg-white drop-shadow-lg rounded-lg p-2">
          {
            user.follows
            .map((following: UserExtendedFollowers) => {
              return <UserListItem key={following.id} user={following}/>
            })
          }
        </div> :
        <div className="flex px-5 py-10 bg-white rounded-md justify-center items-center drop-shadow-lg">
          <p className="text-zinc-400 text-sm">Not following anyone</p>
        </div>
      }
    </div>
  )
}
