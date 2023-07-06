export default function ProfileSkeleton() {
  return (
    <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-2 items-center">
      <div className="relative w-20 h-20 md:w-24 md:h-24 aspect-square dark:bg-zinc-800 bg-zinc-200 animate-pulse rounded-full"></div>  
      <div className="flex flex-col space-y-1 items-center md:items-start">
        <div className="w-72 h-4 rounded-lg dark:bg-zinc-800 bg-zinc-200 animate-pulse"></div>
        <div className="w-48 h-4 rounded-lg dark:bg-zinc-800 bg-zinc-200 animate-pulse"></div>
      </div>
    </div>
  )
}