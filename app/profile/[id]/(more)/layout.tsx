import ProfileMenu from "@/components/profile/ProfileMenu";

export default function ProfileMoreLayout({ children, params }: {children: React.ReactNode, params: { id: string }}) {  
  return (       
    <div className="flex space-y-10 mx-3 my-10 md:m-14 lg:mx-48 2xl:mx-96 flex-col">
      <ProfileMenu id={params.id}/>
      {children}
    </div>
  )
}