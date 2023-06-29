import Link from "next/link";
import { TbExclamationCircle, TbRocket } from "react-icons/tb";

export default function Alert({ message }: { message: string }) {
  return (
    <div className="w-full space-x-3 border border-zinc-800 p-5 rounded-md items-center flex">
      <TbExclamationCircle className="text-2xl"/>
      <div className="flex flex-col">
        <p className="font-medium text-sm">Heads up!</p>
        <p className="text-sm text-zinc-400">{message}</p>
      </div>
    </div>
  )
}