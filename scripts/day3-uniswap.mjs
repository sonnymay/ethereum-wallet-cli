import { createPublicClient, http, formatUnits } from 'viem'
import { mainnet } from 'viem/chains'

const rpcUrl = process.env.ALCHEMY_RPC_URL

if (!rpcUrl) {
  throw new Error('Missing ALCHEMY_RPC_URL')
}

const client = createPublicClient({
  chain: mainnet,
  transport: http(rpcUrl),
})

const ETH_USDC_PAIR = '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc'

const PAIR_ABI = [
  {
    name: 'getReserves',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      { name: 'reserve0', type: 'uint112' },
      { name: 'reserve1', type: 'uint112' },
      { name: 'blockTimestampLast', type: 'uint32' },
    ],
  },
]

const [reserve0, reserve1] = await client.readContract({
  address: ETH_USDC_PAIR,
  abi: PAIR_ABI,
  functionName: 'getReserves',
})

const usdcReserve = Number(formatUnits(reserve0, 6))
const wethReserve = Number(formatUnits(reserve1, 18))
const ethPrice = usdcReserve / wethReserve

console.log('USDC reserve:', usdcReserve)
console.log('WETH reserve:', wethReserve)
console.log('ETH price: $' + ethPrice.toFixed(2))
