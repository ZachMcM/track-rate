import SettingsMenu from "@/components/SettingsMenu";

export const metadata = {
  title: "profile settings"
}

export default function SettingsLayout({ children }: { children: React.ReactNode}) {  
  return (
    <div className="flex flex-col space-y-5 p-10 rounded-md border border-zinc-800">
      <div className="flex flex-col space-y-2 border-b border-zinc-800 pb-5 w-full">
        <h1 className="text-2xl font-bold w-full">Settings</h1>
        <p className="text-zinc-400">
          Manage your profile info including your name, bio, and favorites.
        </p>
      </div>
      <div className="flex flex-col space-y-10 md:flex-row md:space-y-0 md:space-x-10">
        <SettingsMenu/>
        {children}
      </div>
    </div>
  )
}