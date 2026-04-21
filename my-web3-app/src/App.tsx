import { useAccount } from 'wagmi'
import { ConnectWallet } from './components/ConnectWallet'
import { NetworkBadge } from './components/NetworkBadge'
import { WalletBalances } from './components/WalletBalances'
import { TokenPrices } from './components/TokenPrices'
import { PortfolioValue } from './components/PortfolioValue'

export default function App() {
  const { isConnected } = useAccount()

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="mx-auto flex max-w-5xl items-center justify-between border-b border-zinc-800 px-6 py-4">
        <h1 className="text-lg font-semibold">Wallet Dashboard</h1>

        <div className="flex items-center gap-3">
          <NetworkBadge />
          <ConnectWallet />
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 px-6 py-10">
        <div>
          <h2 className="text-2xl font-bold">Overview</h2>
          <p className="text-zinc-400">
            Live wallet balances and token prices on Ethereum mainnet.
          </p>
        </div>

        {!isConnected ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-zinc-300">Connect MetaMask to view your portfolio and balances.</p>
          </div>
        ) : (
          <>
            <PortfolioValue />
            <WalletBalances />
          </>
        )}

        <TokenPrices />
      </main>
    </div>
  )
}
