# Contributing to Ethereum Wallet Dashboard

Thank you for your interest! Contributions are welcome, especially around:
- Additional ERC-20 token support
- New price data sources
- Improved error handling for edge cases (wrong network, no provider)
- UI improvements

## Before You Start

Please open an issue before sending a large PR — this keeps us aligned and avoids wasted work.

## Local Setup

```bash
git clone https://github.com/sonnymay/ethereum-wallet-cli.git
cd ethereum-wallet-cli
npm install
npm run dev
```

Open http://localhost:5173 and connect MetaMask to Ethereum mainnet.

## Code Style

- TypeScript strict mode throughout — no implicit `any`
- Components in `src/components/`, hooks in `src/hooks/`
- Run `npm run lint` before committing

## Pull Request Guidelines

1. Fork the repo and create a feature branch (`git checkout -b feat/your-feature`)
2. Make sure the app builds (`npm run build`)
3. Open a PR with a clear description of the change

## Questions?

Open a GitHub issue or reach out at sonnymaywi@gmail.com.
