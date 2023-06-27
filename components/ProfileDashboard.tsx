import { getUser } from "@/app/serverMethods"
import ProfileMenu from "./ProfileMenu"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from 'next-auth/next'
import Image from "next/image"
import SettingsButton from "./SettingsButtons"
import Link from "next/link"

export default async function ProfileDashboard({ id }: { id: string }) {
  const user = await getUser(id)
  const session = await getServerSession(authOptions)

  return (
    <div className="my-10 flex flex-col space-y-8 md:space-y-5">
      <div className="flex flex-col space-y-3 items-center md:flex-row md:space-y-0 md:justify-between md:items-start">
        <div className="flex space-x-5 items-center">
          <div className="w-16 h-16 md:w-20 md:h-20 aspect-square">
            <Image 
              src={user.image || ""}
              height={100}
              width={100}
              alt="avatar"
              className="rounded-full"
            />
          </div>  
          <div className="flex flex-col space-y-3">
            <h3 className="font-bold md:text-lg">{user.name}</h3>
            {
              (session && session.user.id == user.id) &&
              <SettingsButton id={user.id}/>
            }
          </div>
        </div>
        <div className="flex space-x-8">
          <div className="flex flex-col space-y-1 text-center">
            <p className="font-bold text-xl md:text-2xl">{user.reviews.length}</p>
            <Link href={`/profile/${user.id}/reviews`} className="text-xs text-gray-400 hover:opacity-80 duration-300">Review{user.reviews.length != 1 && "s"}</Link>
          </div>
          <div className="flex flex-col space-y-1 text-center">
            <p className="font-bold text-xl md:text-2xl">{user.followers ? user.followers.length : 0}</p>
            <Link href={`/profile/${user.id}/network`} className="text-xs text-gray-400 hover:opacity-80 duration-300">Follower{user.followers && user.followers.length != 1 && "s"}</Link>
          </div>
          <div className="flex flex-col space-y-1 text-center">
            <p className="font-bold text-xl md:text-2xl">{user.follows ? user.follows.length : 0}</p>
            <Link href={`/profile/${user.id}/network`} className="text-xs text-gray-400 hover:opacity-80 duration-300">Following{user.follows && user.follows.length != 1 && "s"}</Link>
          </div>
        </div>
      </div>
      <ProfileMenu id={id}/>
    </div>
  )
}