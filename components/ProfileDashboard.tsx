import { getUser } from "@/app/serverMethods"
import ProfileMenu from "./ProfileMenu"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from 'next-auth/next'
import Image from "next/image"
import SettingsButton from "./SettingsButtons"

export default async function ProfileDashboard({ id }: { id: string }) {
  const user = await getUser(id)
  const session = await getServerSession(authOptions)

  return (
    <div className="mt-10 flex flex-col space-y-5">
      <div className="flex space-x-5 items-center">
        <div className="relative w-16 h-16 md:w-20 md:h-20">
          <Image 
            src={user.image || ""}
            fill
            alt="avatar"
            className="rounded-full"
          />
        </div>  
        <div className="flex flex-col space-y-3">
          <h3 className="font-bold md:text-lg">{user.name}</h3>
          {
            session.user.id == user.id &&
            <SettingsButton id={user.id}/>
          }
        </div>
      </div>
      <ProfileMenu id={id}/>
    </div>
  )
}