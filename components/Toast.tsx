'use client'

import { Dispatch, ReactNode, SetStateAction } from "react";
import { TbX } from "react-icons/tb";

export default function Toast({ toast, setToast, children }: { toast: boolean, setToast: Dispatch<SetStateAction<boolean>>, children: ReactNode }) {
  return (
    <div className={`${!toast ? "translate-y-full" : "!m-5 translate-y-0"} duration-300 group fixed bottom-0 right-0 p-5 w-3/5 md:w-1/3 bg-white rounded-lg drop-shadow-lg`}>
      <button
        className="text-zinc-500 p-2 m-2 hover:bg-zinc-100 rounded-full duration-300 absolute top-0 right-0 opacity-0 group-hover:opacity-100"
        onClick={() => setToast(false)}
      >
          <TbX/>
      </button>
      <div className="flex flex-col space-y-1 text-sm">
        {children}
      </div>
    </div>
  )
}