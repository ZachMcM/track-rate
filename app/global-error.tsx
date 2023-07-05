'use client'

import Link from "next/link";

export default function GlobalError({
  error,
  reset
}: {
  error: Error,
  reset: () => void
}) {
  return (
    <main className="fixed left-0 top-0 h-full w-full flex items-center justify-center bg-zinc-100 z-40">
      <div className="flex flex-col space-y-8 p-10 m-5 bg-white rounded-lg drop-shadow-lg md:w-2/5">
        <div className="flex flex-col space-y-2 items-center">
          <h1 className="text-3xl md:text-5xl font-semibold text-center">Oops</h1>
          <p className="text-sm md:text-lg text-zinc-500 md:max-w-md text-center">
            There was an error, something went wrong...
          </p>
        </div>
        <Link className="md:mx-10 text-center py-2.5 px-5 bg-zinc-950 text-white font-medium rounded-lg hover:opacity-80 duration-300" href="/">Home</Link>
      </div>
    </main>
  );
}