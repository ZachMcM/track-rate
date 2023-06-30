'use client'

import { Dispatch, SetStateAction, useState } from "react"
import { useDetectClickOutside } from "react-detect-click-outside"
import { TbSearch, TbX } from "react-icons/tb"

export default function SearchBar() {
  const [modal, setModal] = useState<boolean>(false)

  return (
    <>
      <button 
        className="text-white border border-zinc-800 rounded-md p-2 lg:px-4 flex items-center space-x-2 focus-within:ring-1 ring-zinc-800 hover:bg-zinc-800 duration-300"
        onClick={() => setModal(true)}
      >
        <TbSearch className="text-xl"/>
        <div className="hidden lg:block font-normal pr-20">Search...</div>
      </button>
      { modal && <SearchModal setModal={setModal}/> }
    </>
  )
}

function SearchModal({ setModal }: { setModal: Dispatch<SetStateAction<boolean>> }) {
  const [search, setSearch] = useState<string>('')

  const closeModal = () => {
    setSearch("")
    setModal(false)
  }

  const modalRef = useDetectClickOutside({ onTriggered: closeModal})

  return (
    <div className="z-40 fixed !m-0 w-full h-full left-0 top-0 right-0 bottom-0 backdrop-blur-md flex p-10 justify-center items-center">
      <div ref={modalRef} className="flex focus-within:ring-2 ring-zinc-800 py-3 px-4 justify-between items-center w-full md:w-3/5 lg:w-2/5 rounded-md border border-zinc-800 bg-zinc-950">
        <div className="flex space-x-2 items-center font-normal w-full">
          <TbSearch className="text-xl"/>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="bg-transparent border-none outline-none placeholder:text-zinc-400 text-md text-white w-full"
            placeholder="Search..."
          />
        </div>
        <button
          onClick={closeModal}
          className="hover:text-white duration-300 text-zinc-400"
        >
          <TbX className="text-lg"/>
        </button>
      </div>
    </div>
  )
}