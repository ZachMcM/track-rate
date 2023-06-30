"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BsGoogle } from "react-icons/bs";
import { TbArrowLeft } from "react-icons/tb";

export default function SignIn() {
  const { data: session } = useSession();

  if (session) {
    redirect("/");
  }

  return (
    <main className="fixed left-0 top-0 h-full w-full flex items-center justify-center bg-zinc-950 z-40">
      <Link
        className="w-fit flex items-center space-x-1 px-4 py-2 border border-zinc-800 rounded-md hover:bg-zinc-800 duration-300 absolute top-0 left-0 m-5 md:m-10"
        href="/"
      >
        <TbArrowLeft />
        <p className="text-xs">Back</p>
      </Link>
      <div className="flex flex-col space-y-5 p-10">
        <div className="flex flex-col space-y-2 items-center">
          <h3 className="text-2xl font-medium text-center">Welcome back</h3>
          <p className="test-sm text-zinc-400 md:max-w-md text-center">
            By continuing you are setting up a trackrate account you are agreeing to
            our User Agreement and Privacy Policy
          </p>
        </div>
        <div className="flex flex-col space-y-5">
          <div className="flex items-center space-x-3 justify-center">
            <div className="h-[1px] bg-zinc-800 w-24"></div>
            <p className="text-zinc-400 text-xs uppercase">Continue with Google</p>
            <div className="h-[1px] bg-zinc-800 w-24"></div>
          </div>
          <button
            className="py-2 px-4 w-5/6 self-center hover:opacity-80 duration-300 text-zinc-950 bg-white rounded-md flex items-center space-x-2 justify-center"
            onClick={() => signIn("google")}
          >
            <BsGoogle className="text-lg" />
            <p className="font-semibold">Google</p>
          </button>
        </div>
      </div>
    </main>
  );
}
