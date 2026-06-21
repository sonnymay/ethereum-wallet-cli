# Ethereum Wallet Dashboard

[![Live Demo](https://img.shields.io/badge/Live_Demo-black?style=for-the-badge&logo=vercel)](https://ethereum-wallet-cli.vercel.app)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![wagmi](https://img.shields.io/badge/wagmi-1C1C1C?style=for-the-badge)](https://wagmi.sh)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8)](https://tailwindcss.com)

A responsive Web3 wallet dashboard built with React and TypeScript. Connect MetaMask, view live ETH and ERC-20 token balances on Ethereum mainnet, see token prices with 24-hour changes, and track total portfolio value in USD.

## Live Demo

[Open the app](https://ethereum-wallet-cli.vercel.app)

## Features

- Connect wallet with MetaMask
- Show connected wallet address and Ethereum mainnet network badge
- Show ETH, USDC, and USDT balances
- Show total portfolio value in USD
- Live ETH, BTC, and USDC prices with 24h price change
- Responsive mobile-friendly layout
- Loading skeleton states and clean empty states

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Wallet / Chain | wagmi + viem |
| Data Fetching | TanStack Query |
| Styling | Tailwind CSS |
| Deployment | Vercel |

## What This Code Shows

- wagmi hooks for wallet connection, balance reading, and chain detection
- viem for type-safe Ethereum RPC calls and ERC-20 contract reads
- TanStack Query for polling live price data with cache invalidation
- Tailwind CSS responsive layouts with skeleton loading states
- TypeScript strict mode throughout — no implicit any
- Clean component architecture separating wallet, price, and portfolio concerns

## Local Setup

```bash
npm install
npm run dev
```

Open http://localhost:5173 and connect MetaMask to Ethereum mainnet to see live balances.

## License

MIT
