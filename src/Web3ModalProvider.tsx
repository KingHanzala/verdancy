import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { arbitrum, mainnet } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { SolanaAdapter } from '@reown/appkit-adapter-solana/react'
import { solana, solanaTestnet, solanaDevnet } from '@reown/appkit/networks'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'

// 0. Setup queryClient
const queryClient = new QueryClient()
const solanaWeb3JsAdapter = new SolanaAdapter({
  wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()]
})

// 1. Your WalletConnect Cloud project ID
const projectId = import.meta.env.VITE_REOWN_ID;

// 2. Create wagmiConfig
const metadata = {
  name: 'cryptoutils',
  description: 'CryptoUtils',
  url: 'https://cryptoutils.xyz', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}
export const networks = [mainnet, arbitrum]
  const wagmiAdapter = new WagmiAdapter({
    ssr: true,
    networks,
    projectId
  })

createAppKit({
  adapters: [wagmiAdapter, solanaWeb3JsAdapter],
  networks: [mainnet, arbitrum, solana, solanaTestnet, solanaDevnet],
  metadata,
  showWallets: true,
  projectId,
  features: {
    email: false,
    socials: [],
    emailShowWallets: true,
    analytics: false // Optional - defaults to your Cloud configuration
  }
})

export function Web3ModalProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}