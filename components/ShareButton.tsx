'use client'

import { useState } from "react"
import Toast from "./Toast"
import { TbShare2 } from "react-icons/tb"

export default function ShareButton({ className, link, type }: { className: string, link: string, type: string }) {
  const [toast, setToast] = useState<boolean>(false)

  const share =  async () => {
    try {
      await navigator.share({
        url: "https://traclrate.app" + link
      })
    } catch (e) {
      console.log(e)
      try {
        await navigator.clipboard.writeText("https://traclrate.app" + link)
        setToast(true)
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <>
      <button
        className={className}
        onClick={share}
      >
        <div className="flex items-center space-x-2">
          <TbShare2 className="text-lg"/>
          <p>Share this {type}</p>
        </div>
      </button>    
      <Toast setToast={setToast} toast={toast}>Copied to clipboard</Toast>
    </>

  )
}