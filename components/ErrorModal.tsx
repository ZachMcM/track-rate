'use client'

import { Dispatch, SetStateAction } from "react"
import { useDetectClickOutside } from "react-detect-click-outside"
import Link from "next/link"

type FnParams = {
  setModal: Dispatch<SetStateAction<boolean>>
  message: string
  redirectLink?: string
  redirectMessage?: string
}

export default function ErrorModal({ setModal, message, redirectLink, redirectMessage }: FnParams) {
  const modalRef = useDetectClickOutside({ onTriggered: () => setModal(false)})

  return (
    <div className="z-40 fixed w-full h-full left-0 p-5 top-0 bottom-0 backdrop-blur-md flex justify-center items-center">
      <div ref={modalRef} className="flex flex-col text-center space-y-5 p-10 w-full md:w-3/5 lg:w-2/5 rounded-md border border-gray-700 bg-gray-950">
        <div className="flex flex-col items-center space-y-2">
          <h3 className="text-lg md:text-2xl text-white font-semibold">Oops, theres an error...</h3>
          <p className="font-medium">{message}</p>
        </div>
        {
          redirectLink && redirectMessage &&
          <div className="flex text-sm md:text-md items-center space-x-5 w-full justify-center font-medium">
            <Link className="px-4 py-2 rounded-md text-white bg-sky-500 hover:bg-sky-400 duration-300" href={redirectLink}>{redirectMessage}</Link>
            <button
              className="px-4 py-2 rounded-md border border-gray-700 hover:opacity-80 duration-300"
              onClick={() => setModal(false)}
            >
              <p>Close</p>
            </button>
          </div>
        }
      </div>
    </div>
  )
}