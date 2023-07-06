export const metadata = {
  title: "profile settings"
}

export default function SettingsLayout({ children }: { children: React.ReactNode}) {  
  return (
    <div className="flex space-y-10 mx-3 my-10 md:m-14 lg:mx-72 2xl:mx-96 flex-col">
      {children}
    </div>
  )
}