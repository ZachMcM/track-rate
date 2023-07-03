import ProfileMenu from "@/components/profile/ProfileMenu";

export default function ProfileMoreLayout({ children, params }: {children: React.ReactNode, params: { id: string }}) {  
  return (       
    <div className="flex space-y-10 mx-8 my-10 md:mx-14 flex-col">
      <ProfileMenu id={params.id}/>
      {children}
    </div>
  )
}