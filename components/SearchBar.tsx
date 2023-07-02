'use client'

import { Dispatch, SetStateAction, useState } from "react"
import { useDetectClickOutside } from "react-detect-click-outside"
import { TbSearch, TbX } from "react-icons/tb"

export default function SearchBar() {
  const [input, setInput] = useState<string>('')

  return (
    <>
      <div 
        className="text-sm !m-4 border text-zinc-400 border-zinc-200 bg-zinc-100 rounded-md p-2 lg:px-4 flex items-center space-x-2 focus-within:ring-4 ring-sky-200 duration-300"
      >
        <TbSearch className="text-xl"/>
        <input 
          className="hidden lg:block font-normal bg-transparent outline-none border-none placeholder:text-zinc-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search trackrate..."
        />
      </div>
    </>
  )
}