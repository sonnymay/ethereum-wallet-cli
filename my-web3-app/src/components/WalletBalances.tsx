import { useAccount, useBalance, useReadContract } from 'wagmi'
import { formatUnits, erc20Abi } from 'viem'
import { SkeletonCard } from './SkeletonCard'

const USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'

export function WalletBalances() {
  const { address, isConnected } = useAccount()

  const { data: ethBalance, isLoading: ethLoading } = useBalance({
    address,
  })

  const { data: usdcBalance, isLoading: usdcLoading } = useReadContract({
    address: USDC,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  })

  if (!isConnected || !address) {
    return null
  }

  if (ethLoading || usdcLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-sm text-zinc-400">ETH Balance</p>
        <p className="mt-2 text-2xl font-semibold">
          {ethLoading ? 'Loading...' : `${formatUnits(ethBalance?.value ?? 0n, ethBalance?.decimals ?? 18)} ETH`}
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-sm text-zinc-400">USDC Balance</p>
        <p className="mt-2 text-2xl font-semibold">
          {usdcLoading ? 'Loading...' : `${formatUnits(usdcBalance ?? 0n, 6)} USDC`}
        </p>
      </div>
    </div>
  )
}
