'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SettingsMenu() {
  const pathname = usePathname()

  return (
    <div className="flex space-x-3 md:w-1/6 md:space-x-0 md:flex-col md:space-y-3 font medium text-sm">
      <Link className={`py-2 px-4 text-start duration-300 rounded-md ${pathname == "/settings" ? "bg-zinc-800" : "hover:underline"}`} href={`/settings`}>Profile</Link>
      <Link className={`py-2 px-4 text-start duration-300 rounded-md ${pathname == "/settings/favorites" ? "bg-zinc-800" : "hover:underline"}`} href={`/settings/favorites`}>Favorites</Link>
    </div>
  )
}