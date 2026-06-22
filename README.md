# Ethereum Wallet Dashboard

[![Live Demo](https://img.shields.io/badge/Live_Demo-black?style=for-the-badge&logo=vercel)](https://ethereum-wallet-cli.vercel.app)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![wagmi](https://img.shields.io/badge/wagmi-1C1C1C?style=for-the-badge)](https://wagmi.sh)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

A responsive Web3 wallet dashboard built with React and TypeScript. Connect MetaMask, view live ETH and ERC-20 token balances on Ethereum mainnet, see token prices with 24-hour changes, and track total portfolio value in USD.

**[▶ Open the app](https://ethereum-wallet-cli.vercel.app)**

---

## Why This Exists

Most Web3 tutorials stop at "connect a wallet." I wanted to go further — actually read live ERC-20 balances from the chain, pull real-time prices, aggregate them into a portfolio view, and handle all the intermediate states (connecting, loading, wrong network) cleanly. This is the dashboard I'd want when I actually hold tokens.

---

## What This Code Shows

- **wagmi hooks** for wallet connection (`useAccount`, `useBalance`), chain detection, and ERC-20 contract reads (`useReadContract`)
- **viem** for type-safe Ethereum RPC calls — no implicit `any`, no raw hex strings
- **TanStack Query** polling live price data from a public API with cache invalidation on wallet change
- **Skeleton loading states** — every async operation has a proper loading and empty state, never a blank flash
- **TypeScript strict mode** throughout — wallet addresses typed as `Address`, amounts as `bigint`, no implicit `any`
- **Responsive Tailwind layout** — works on mobile and desktop without media query spaghetti

---

## Features

- Connect wallet with MetaMask
- Show connected wallet address with Ethereum mainnet network badge
- Show ETH, USDC, and USDT balances (reads ERC-20 contracts directly)
- Show total portfolio value in USD
- Live ETH, BTC, and USDC prices with 24h change
- Responsive mobile-friendly layout
- Loading skeletons and clean empty states

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Wallet / Chain | wagmi + viem |
| Data Fetching | TanStack Query |
| Styling | Tailwind CSS |
| Deployment | Vercel |

---

## Local Setup

```bash
npm install
npm run dev
```

Open http://localhost:5173 and connect MetaMask to Ethereum mainnet to see live balances.

---

## License

MIT © Sonny May
