import { ConnectWallet } from './components/ConnectWallet'
import { WalletBalances } from './components/WalletBalances'

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="mx-auto flex max-w-4xl items-center justify-between border-b border-zinc-800 px-6 py-4">
        <h1 className="text-lg font-semibold">Wallet Dashboard</h1>
        <ConnectWallet />
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Overview</h2>
          <p className="text-zinc-400">Live wallet balances on Ethereum mainnet.</p>
        </div>

        <WalletBalances />
      </main>
    </div>
  )
}
