"use client";

import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function SignIn() {
  const { data: session } = useSession();

  if (session) {
    redirect("/");
  }

  return (
    <main className="fixed left-0 top-0 h-full w-full flex items-center justify-center bg-zinc-950">
      <div className="flex flex-col space-y-5 p-5 md:p-10 m-5 border border-zinc-800 rounded-se-md">
        <div className="flex flex-col space-y-2 items-center">
          <h3 className="text-2xl font-semibold text-center">Sign In</h3>
          <p className="test-sm text-zinc-400 md:max-w-md text-center">
            By continuing you are setting up a trackrate account and agree to
            our User Agreement and Privacy Policy
          </p>
        </div>
        <button
          className="py-2 px-4 w-1/2 self-center hover:opacity-80 duration-300 text-zinc-950 bg-white rounded-md flex items-center space-x-2 justify-center"
          onClick={() => signIn("google")}
        >
          <FcGoogle className="text-2xl" />
          <p className="font-semibold">Google</p>
        </button>
      </div>
    </main>
  );
}
