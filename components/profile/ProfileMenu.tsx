import { getUser } from "@/app/serverMethods"
import Image from "next/image"
import Link from "next/link"
import ProfileNav from "./ProfileNav"

export default async function ProfileMenu({ id }: { id: string }) {
  const user = await getUser(id)

  return (
    <nav className="bg-white drop-shadow-lg rounded-lg flex flex-col space-y-3 md:flex-row md:space-y-0 items-start md:space-x-3 p-4 md:items-center">
      <div className="flex space-x-3 items-center">
        <Link href={`/profile/${id}`} className="h-9 w-9 relative shrink-0 hover:ring-4 ring-sky-200 duration-300 rounded-full">
          <div className="bg-zinc-200 drop-shadow-lg animate-pulse w-full h-full absolute inset-0 rounded-full"></div> :
            <Image
              src={user?.image || ""}
              fill
              alt="avatar"
              className="rounded-full drop-shadow-lg "
            />
        </Link>
        <Link href={`/profile/${id}`} className="font-medium hover:text-sky-400 duration-300">{user.name}</Link>
      </div>      
      <ProfileNav id={id}/>
    </nav>

  )
}