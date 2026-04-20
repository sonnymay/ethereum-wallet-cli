import { createPublicClient, http, formatEther, isAddress } from 'viem'
import { mainnet } from 'viem/chains'

const rpcUrl = process.env.ALCHEMY_RPC_URL
const input = process.argv[2]

if (!rpcUrl) {
  throw new Error('Missing ALCHEMY_RPC_URL')
}

if (!input) {
  console.log('Usage: node scripts/wallet-cli.mjs <wallet-address-or-ens>')
  process.exit(1)
}

const client = createPublicClient({
  chain: mainnet,
  transport: http(rpcUrl),
})

try {
  let address = input

  if (!isAddress(input)) {
    address = await client.getEnsAddress({ name: input })

    if (!address) {
      throw new Error('Invalid address or ENS name not found')
    }
  }

  const balance = await client.getBalance({ address })
  const block = await client.getBlock({ blockTag: 'latest' })

  console.log('Address:', address)
  console.log('Balance:', formatEther(balance), 'ETH')
  console.log('Latest block:', block.number.toString())
} catch (error) {
  console.error('Error:', error.message)
}
