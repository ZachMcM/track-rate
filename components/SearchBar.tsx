'use client'

import { useState } from "react"
import { TbSearch } from "react-icons/tb"

export default function SearchBar() {
  const [search, setSearch] = useState<string>('')

  return (
    <div className="border border-zinc-700 rounded-md py-2 px-4 flex items-center space-x-2 focus-within:ring-2 ring-offset-2 ring-zinc-700 ring-offset-zinc-950">
      <TbSearch className="text-lg"/>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border-none outline-none bg-transparent placeholder:text-zinc-400 font-normal text-white"
        placeholder="Search..."
      />
    </div>
  )
}