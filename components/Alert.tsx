import Link from "next/link";
import { TbExclamationCircle, TbRocket } from "react-icons/tb";

export default function Alert({ message }: { message: string }) {
  return (
    <div className="w-full space-x-3 border border-red-800 text-red-800 p-5 rounded-md items-center flex">
      <TbExclamationCircle className="text-2xl"/>
      <div className="flex flex-col">
        <p className="font-medium text-sm">Heads up!</p>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  )
}