import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const rpcUrl = process.env.ALCHEMY_RPC_URL

if (!rpcUrl) {
  throw new Error('Missing ALCHEMY_RPC_URL')
}

const client = createPublicClient({
  chain: mainnet,
  transport: http(rpcUrl),
})

const USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const latest = await client.getBlockNumber()

const logs = await client.getLogs({
  address: USDC,
  event: {
    name: 'Transfer',
    type: 'event',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256' },
    ],
  },
  fromBlock: latest - 9n,
  toBlock: latest,
})

console.log('Recent USDC transfers:', logs.length)
console.log(logs[0])
