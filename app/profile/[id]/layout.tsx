import { getUser } from "@/app/serverMethods";
import ProfileDashboard from "@/components/ProfileDashboard";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata({ params }: { params: { id: string }, parent?: ResolvingMetadata}): Promise<Metadata> {
  const user = await getUser(params.id)
  return {
    title: `${user.name}'s profile`
  }
}

export default function ProfileLayout({ children, params }: {children: React.ReactNode, params: { id: string }}) {  
  return (
    <div className="flex flex-col space-y-16 px-5 md:px-10">
      <ProfileDashboard id={params.id}/>        
      {children}
    </div>
  )
}