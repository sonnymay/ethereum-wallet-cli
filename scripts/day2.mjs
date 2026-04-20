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

const address = await client.getEnsAddress({
  name: 'vitalik.eth',
})

const block = await client.getBlock({ blockTag: 'latest' })

console.log('ENS address:', address)
console.log('Block number:', block.number.toString())
console.log('Tx count:', block.transactions.length)
console.log('Timestamp:', block.timestamp.toString())
