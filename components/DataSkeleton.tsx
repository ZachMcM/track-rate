export default function DataSkeleton() {
  return (
    <div className="flex items-center flex-col space-y-5 md:space-y-0 md:flex-row md:space-x-10 w-full">
      <div className="h-60 w-60  bg-zinc-800 rounded-md animate-pulse"></div>
      <div className="flex flex-col space-y-3 items-center md:items-start w-full md:w-2/3">
        <div className="h-3 w-full rounded-full bg-zinc-800 animate-pulse"></div>
        <div className="h-3 w-4/5 rounded-full bg-zinc-800 animate-pulse"></div>
        <div className="h-3 w-3/5 rounded-full bg-zinc-800 animate-pulse"></div>
        <div className="h-3 w-2/5 rounded-full bg-zinc-800 animate-pulse"></div>
        <div className="h-3 w-1/5 rounded-full bg-zinc-800 animate-pulse"></div>
      </div>
    </div>
  )
}