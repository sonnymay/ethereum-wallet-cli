import { useAccount } from 'wagmi'

export function NetworkBadge() {
  const { chain, isConnected } = useAccount()

  if (!isConnected || !chain) return null

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-300">
      {chain.name}
    </div>
  )
}
