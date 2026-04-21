export function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
      <div className="h-4 w-24 rounded bg-zinc-800" />
      <div className="mt-4 h-8 w-32 rounded bg-zinc-800" />
      <div className="mt-3 h-4 w-20 rounded bg-zinc-800" />
    </div>
  )
}
