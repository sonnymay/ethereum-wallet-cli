import { useEffect, useState } from "react";
import { useAccount, useBalance, useReadContract } from "wagmi";
import { erc20Abi, formatUnits } from "viem";
import { SkeletonCard } from "./SkeletonCard";

const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

type PriceResponse = {
  ethereum: { usd: number };
  "usd-coin": { usd: number };
  tether: { usd: number };
};

export function PortfolioValue() {
  const { address, isConnected } = useAccount();
  const [prices, setPrices] = useState<PriceResponse | null>(null);
  const [priceError, setPriceError] = useState("");

  const { data: ethBalance, isLoading: ethLoading } = useBalance({
    address,
  });

  const { data: usdcBalance, isLoading: usdcLoading } = useReadContract({
    address: USDC,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  const { data: usdtBalance, isLoading: usdtLoading } = useReadContract({
    address: USDT,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  useEffect(() => {
    async function loadPrices() {
      try {
        setPriceError("");

        const params = new URLSearchParams({
          ids: "ethereum,usd-coin,tether",
          vs_currencies: "usd",
          x_cg_demo_api_key: import.meta.env.VITE_COINGECKO_DEMO_API_KEY,
        });

        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?${params.toString()}`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch prices");
        }

        const data: PriceResponse = await res.json();
        setPrices(data);
        setPriceError("");
      } catch (err) {
        setPriceError(
          err instanceof Error ? err.message : "Something went wrong",
        );
      }
    }

    loadPrices();
  }, []);

  if (!isConnected || !address) {
    return null;
  }

  if (ethLoading || usdcLoading || usdtLoading || !prices) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
          <div className="h-4 w-40 rounded bg-zinc-800" />
          <div className="mt-4 h-10 w-40 rounded bg-zinc-800" />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  if (priceError) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-red-400">Price error: {priceError}</p>
      </div>
    );
  }

  const ethAmount = Number(
    formatUnits(ethBalance?.value ?? 0n, ethBalance?.decimals ?? 18),
  );
  const usdcAmount = Number(formatUnits(usdcBalance ?? 0n, 6));
  const usdtAmount = Number(formatUnits(usdtBalance ?? 0n, 6));

  const ethValue = ethAmount * prices.ethereum.usd;
  const usdcValue = usdcAmount * prices["usd-coin"].usd;
  const usdtValue = usdtAmount * prices.tether.usd;
  const totalValue = ethValue + usdcValue + usdtValue;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-sm text-zinc-400">Total Portfolio Value</p>
        <p className="mt-2 text-3xl font-bold">${totalValue.toFixed(2)}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
          <p className="text-sm text-zinc-400">ETH</p>
          <p className="mt-2 text-xl font-semibold">{ethAmount.toFixed(6)}</p>
          <p className="mt-1 text-sm text-zinc-400">${ethValue.toFixed(2)}</p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
          <p className="text-sm text-zinc-400">USDC</p>
          <p className="mt-2 text-xl font-semibold">{usdcAmount.toFixed(2)}</p>
          <p className="mt-1 text-sm text-zinc-400">${usdcValue.toFixed(2)}</p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
          <p className="text-sm text-zinc-400">USDT</p>
          <p className="mt-2 text-xl font-semibold">
            {usdtLoading ? "Loading..." : usdtAmount.toFixed(2)}
          </p>
          <p className="mt-1 text-sm text-zinc-400">${usdtValue.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
