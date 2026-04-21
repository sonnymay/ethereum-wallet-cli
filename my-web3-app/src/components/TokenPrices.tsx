import { useEffect, useState } from 'react'
import { SkeletonCard } from './SkeletonCard'

type CoinPrice = {
  usd: number
  usd_24h_change: number
}

type PricesResponse = {
  ethereum: CoinPrice
  bitcoin: CoinPrice
  'usd-coin': CoinPrice
}

const coins = [
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
  { id: 'usd-coin', name: 'USD Coin', symbol: 'USDC' },
] as const

export function TokenPrices() {
  const [prices, setPrices] = useState<PricesResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadPrices() {
      try {
        setLoading(true)
        setError('')

        const params = new URLSearchParams({
          ids: 'ethereum,bitcoin,usd-coin',
          vs_currencies: 'usd',
          include_24hr_change: 'true',
          x_cg_demo_api_key: import.meta.env.VITE_COINGECKO_DEMO_API_KEY,
        })

        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?${params.toString()}`
        )

        if (!res.ok) {
          throw new Error('Failed to fetch prices')
        }

        const data: PricesResponse = await res.json()
        setPrices(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    loadPrices()
  }, [])

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    )
  }

  if (error || !prices) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-red-400">Price error: {error || 'No data'}</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {coins.map((coin) => {
        const item = prices[coin.id]
        const change = item.usd_24h_change
        const positive = change >= 0

        return (
          <div key={coin.id} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">{coin.name}</p>
            <p className="mt-2 text-2xl font-semibold">${item.usd.toLocaleString()}</p>
            <p className={`mt-2 text-sm ${positive ? 'text-green-400' : 'text-red-400'}`}>
              {positive ? '+' : ''}
              {change.toFixed(2)}%
            </p>
          </div>
        )
      })}
    </div>
  )
}
