export default function UserSkeleton() {
  return (
    <div className="flex space-x-3 items-center">
      <div className="h-12 w-12 rounded-full bg-zinc-800 animate-pulse"></div>
      <div className="flex flex-col space-y-2">
        <div className="h-2 w-48 bg-zinc-800 rounded-full animate-pulse"></div>
        <div className="h-2 w-28 bg-zinc-800 rounded-full animate-pulse"></div>
        <div className="h-2 w-12 bg-zinc-800 rounded-full animate-pulse"></div>
      </div>
    </div>
  )
}