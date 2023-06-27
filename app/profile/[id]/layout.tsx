import { getUser } from "@/app/serverMethods";
import ProfileDashboard from "@/components/ProfileDashboard";
import { Metadata, ResolvingMetadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({ params }: { params: { id: string }, parent?: ResolvingMetadata}): Promise<Metadata> {
  const user = await getUser(params.id)
  return {
    title: `${user.name}'s profile`
  }
}

export default function ProfileLayout({ children, params }: {children: React.ReactNode, params: { id: string }}) {  
  return (
    <>
      <Suspense>
        <ProfileDashboard id={params.id}/>
      </Suspense>
      {children}
    </>
  )
}