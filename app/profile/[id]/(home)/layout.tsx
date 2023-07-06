import ProfileDashboard from "@/components/profile/ProfileDashboard";
import ProfileMenu from "@/components/profile/ProfileMenu";
import ProfileSkeleton from "@/components/profile/ProfileSkeleton";
import { Suspense } from "react";

export default function ProfileHomeLayout({ children, params }: {children: React.ReactNode, params: { id: string }}) {  
  return (       
    <div className="flex space-y-10 mx-3 my-10 md:m-14 lg:mx-48 2xl:mx-96 flex-col">
      <Suspense fallback={<ProfileSkeleton/>}>
        <ProfileDashboard id={params.id}/>
      </Suspense>
      <ProfileMenu id={params.id}/>
      {children}
    </div>
  )
}