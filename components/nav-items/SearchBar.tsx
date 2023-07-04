'use client'

import { Dispatch, SetStateAction, useState } from "react"
import { useDetectClickOutside } from "react-detect-click-outside"
import { TbSearch, TbX } from "react-icons/tb"

export default function SearchBar() {
  const [input, setInput] = useState<string>('')

  return (
    <>
      <div 
        className="text-sm bg-zinc-100 border-zinc-200 border drop-shadow-lg rounded-lg px-4 md:pr-10 py-2.5 flex items-center space-x-2 focus-within:ring-2 ring-sky-200 duration-300"
      >
        <TbSearch className="text-xl text-zinc-500"/>
        <input 
          className="font-normal bg-transparent outline-none border-none placeholder:text-zinc-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search trackrate..."
        />
      </div>
    </>
  )
}