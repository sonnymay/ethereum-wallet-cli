import { createPublicClient, http, formatUnits, erc20Abi } from 'viem'
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
const VITALIK = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'

const [name, symbol, decimals, totalSupply, balance] = await Promise.all([
  client.readContract({ address: USDC, abi: erc20Abi, functionName: 'name' }),
  client.readContract({ address: USDC, abi: erc20Abi, functionName: 'symbol' }),
  client.readContract({ address: USDC, abi: erc20Abi, functionName: 'decimals' }),
  client.readContract({ address: USDC, abi: erc20Abi, functionName: 'totalSupply' }),
  client.readContract({
    address: USDC,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [VITALIK],
  }),
])

console.log('Name:', name)
console.log('Symbol:', symbol)
console.log('Decimals:', decimals)
console.log('Total supply:', formatUnits(totalSupply, decimals))
console.log("Vitalik's USDC:", formatUnits(balance, decimals))
