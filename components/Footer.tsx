'use client'

import { useSession } from "next-auth/react"
import { TbCopyright } from "react-icons/tb"

export default function Footer() {
  return (
    <footer className="mt-20 mx-16 py-8 px-5 border-t border-zinc-200 flex justify-between text-xs text-zinc-500">
      <p className="flex items-center "><TbCopyright className="mr-1"/> Copyright 2023 Zach McMullen</p>
      <a href="mailto:help@trackrate.app" className="hover:opacity-80 duration-300">help@trackrate.app</a>
    </footer>
  )
}