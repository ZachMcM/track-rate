import { getUser } from "@/app/serverMethods";
import ProfileDashboard from "@/components/ProfileDashboard";
import ProfileMenu from "@/components/ProfileMenu";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata({ params }: { params: { id: string }, parent?: ResolvingMetadata}): Promise<Metadata> {
  const user = await getUser(params.id)
  return {
    title: `${user.name}'s profile`
  }
}

export default function ProfileHomeLayout({ children, params }: {children: React.ReactNode, params: { id: string }}) {  
  return (       
    <div className="flex space-y-10 mx-3 my-10 md:m-14 flex-col">
      <ProfileDashboard id={params.id}/>
      <ProfileMenu id={params.id}/>
      {children}
    </div>
  )
}