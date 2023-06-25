import ProfileDashboard from "@/components/ProfileDashboard";
import { Suspense } from "react";

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