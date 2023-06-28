import Link from "next/link";
import { TbArrowLeft } from "react-icons/tb";

export default function Oops({ message, backUrl }: { message: string, backUrl?: string }) {
  return (
    <div className="w-full flex-col space-y-3 border border-gray-700 p-8 rounded-md flex items-center">
      <p className="text-center w-full text-zinc-400 text-lg font-medium">Oops, {message}</p>
      {
        backUrl &&       
        <Link href={backUrl} className="rounded-md text-zinc-950 items-center text-sm flex space-x-1 py-2 px-4 font-medium bg-white hover:opacity-80 duration-300">
          <TbArrowLeft className="text-lg"/>
          <p>Back</p>
        </Link>
      }
    </div>
  )
}