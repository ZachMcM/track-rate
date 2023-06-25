'use client'

import { Dispatch, SetStateAction } from "react"
import { useDetectClickOutside } from "react-detect-click-outside"
import Link from "next/link"
import { TbInfoCircle } from "react-icons/tb"

type FnParams = {
  setModal: Dispatch<SetStateAction<boolean>>
  message: string
  confirmFunction: Function,
}

export default function DeleteModal({ params }: { params: FnParams}) {
  const modalRef = useDetectClickOutside({ onTriggered: () => params.setModal(false)})

  return (
    <div className="z-40 fixed w-full h-full left-0 p-5 top-0 bottom-0 backdrop-blur-md flex justify-center items-center">
      <div ref={modalRef} className="flex flex-col text-center space-y-5 p-10 w-full md:w-3/5 lg:w-2/5 rounded-md border border-gray-700 bg-gray-950">
        <div className="flex flex-col items-center space-y-2">
          <TbInfoCircle className="text-5xl"/>
          <h3 className="text-lg md:text-2xl text-white font-semibold">{params.message}</h3>
        </div>
        <div className="flex items-center space-x-5 text-sm md:text-md w-full justify-center font-medium">
          <button
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:opacity-80 duration-300"
            onClick={() => {
              params.setModal(false)
              params.confirmFunction()
            }}
          >
            <p>Yes I'm sure</p>
          </button>
          <button
            className="px-4 py-2 rounded-md border border-gray-700 hover:opacity-80 duration-300"
            onClick={() => params.setModal(false)}
          >
            <p>No, cancel</p>
          </button>
        </div>
      </div>
    </div>
  )
}