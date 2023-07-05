import { getUser } from "@/app/serverMethods";
import { Props } from "@/app/types";
import ProfileDashboard from "@/components/profile/ProfileDashboard";
import ProfileMenu from "@/components/profile/ProfileMenu";
import ProfileSkeleton from "@/components/profile/ProfileSkeleton";
import { Metadata, ResolvingMetadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata>  {
  const user = await getUser(params.id)
  return {
    title: `${user.name}'s profile`
  }
}

export default function ProfileHomeLayout({ children, params }: {children: React.ReactNode, params: { id: string }}) {  
  return (       
    <div className="flex space-y-10 mx-3 my-10 md:m-14 flex-col">
      <Suspense fallback={<ProfileSkeleton/>}>
        <ProfileDashboard id={params.id}/>
      </Suspense>
      <ProfileMenu id={params.id}/>
      {children}
    </div>
  )
}