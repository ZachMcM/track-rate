import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getUser } from "../serverMethods";
import ProfileForm from "@/components/profile/ProfileForm";

export default async function Settings() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect("/")
  }

  const user = await getUser(session.user.id)

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex flex-col w-full">
        <p className="font-medium text-2xl">Settings</p>
      </div>
      <ProfileForm user={user}/>
    </div>
  )
}

