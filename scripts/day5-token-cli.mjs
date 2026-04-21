import {
  createPublicClient,
  http,
  formatUnits,
  isAddress,
  erc20Abi,
  parseAbi,
} from 'viem'
import { mainnet } from 'viem/chains'

const rpcUrl = process.env.ALCHEMY_RPC_URL
const tokenAddress = process.argv[2]

if (!rpcUrl) throw new Error('Missing ALCHEMY_RPC_URL')

if (!tokenAddress || !isAddress(tokenAddress)) {
  console.log('Usage: node scripts/day5-token-cli.mjs <token-contract-address>')
  process.exit(1)
}

const client = createPublicClient({
  chain: mainnet,
  transport: http(rpcUrl),
})

const UNISWAP_V2_FACTORY = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'
const WETH = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

const factoryAbi = parseAbi([
  'function getPair(address tokenA, address tokenB) view returns (address pair)',
])

const pairAbi = parseAbi([
  'function getReserves() view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)',
  'function token0() view returns (address)',
  'function token1() view returns (address)',
])

try {
  const [name, symbol, decimals, totalSupply] = await Promise.all([
    client.readContract({ address: tokenAddress, abi: erc20Abi, functionName: 'name' }),
    client.readContract({ address: tokenAddress, abi: erc20Abi, functionName: 'symbol' }),
    client.readContract({ address: tokenAddress, abi: erc20Abi, functionName: 'decimals' }),
    client.readContract({ address: tokenAddress, abi: erc20Abi, functionName: 'totalSupply' }),
  ])

  console.log('Name:', name)
  console.log('Symbol:', symbol)
  console.log('Decimals:', decimals)
  console.log('Total supply:', formatUnits(totalSupply, decimals))

  const pairAddress = await client.readContract({
    address: UNISWAP_V2_FACTORY,
    abi: factoryAbi,
    functionName: 'getPair',
    args: [tokenAddress, WETH],
  })

  if (pairAddress === ZERO_ADDRESS) {
    console.log('No Uniswap V2 WETH pair found')
    process.exit(0)
  }

  const [token0, reserves] = await Promise.all([
    client.readContract({ address: pairAddress, abi: pairAbi, functionName: 'token0' }),
    client.readContract({ address: pairAddress, abi: pairAbi, functionName: 'getReserves' }),
  ])

  const [reserve0, reserve1] = reserves

  let tokenReserve
  let wethReserve

  if (token0.toLowerCase() === tokenAddress.toLowerCase()) {
    tokenReserve = reserve0
    wethReserve = reserve1
  } else {
    tokenReserve = reserve1
    wethReserve = reserve0
  }

  const priceInEth =
    Number(formatUnits(wethReserve, 18)) / Number(formatUnits(tokenReserve, decimals))

  console.log('Uniswap pair:', pairAddress)
  console.log(`1 ${symbol} = ${priceInEth} ETH`)
} catch (error) {
  const message = error.shortMessage || error.message

  if (message.includes('returned no data')) {
    console.error('Error: Not an ERC-20 token contract')
  } else {
    console.error('Error:', message)
  }
}
