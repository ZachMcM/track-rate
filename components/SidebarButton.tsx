'use client'

import { useState } from "react"
import { TbList } from "react-icons/tb"
import Sidebar from "./Sidebar"

export default function SidebarButton() {
  const [sidebar, setSidebar] = useState<boolean>(false)

  return (
    <>
      <button
        className="hover:opacity-80"
        onClick={() => setSidebar(true)}
      >
        <TbList className="text-2xl"/>
      </button>
      <Sidebar setSidebar={setSidebar} sideBar={sidebar}/>
    </>
  )
}