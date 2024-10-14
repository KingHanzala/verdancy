interface chainInfo {
    InfuraId: string;
    LogoFilepath: string;
    ContractABI: string[];
}

const VITE_INFURA_ID = import.meta.env.VITE_INFURA_ID;
const VITE_ALCHEMY_ID = import.meta.env.VITE_ALCHEMY_ID;

export const chainsMap: Map<string, chainInfo> = new Map();

chainsMap.set("Ethereum", {
    InfuraId: `https://mainnet.infura.io/v3/${VITE_INFURA_ID}`,
    LogoFilepath: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    ContractABI: [
    "function balanceOf(address _owner) view returns (uint256)",
    "function decimals() view returns (uint8)"]
});

chainsMap.set("Linea", {
    InfuraId: `https://linea-mainnet.infura.io/v3/${VITE_INFURA_ID}`,
    LogoFilepath: "https://img.cryptorank.io/coins/linea1680021297845.png",
    ContractABI: [
    "function balanceOf(address _owner) view returns (uint256)",
    "function decimals() view returns (uint8)"]
});

chainsMap.set("Polygon", {
    InfuraId: `https://polygon-mainnet.infura.io/v3/${VITE_INFURA_ID}`,
    LogoFilepath: "https://s3.coinmarketcap.com/static-gravity/image/b8db9a2ac5004c1685a39728cdf4e100.png",
    ContractABI: [
    "function balanceOf(address _owner) view returns (uint256)",
    "function decimals() view returns (uint8)"]
});

chainsMap.set("Arbitrum", {
    InfuraId: `https://arbitrum-mainnet.infura.io/v3/${VITE_INFURA_ID}`,
    LogoFilepath: "https://cryptologos.cc/logos/arbitrum-arb-logo.png",
    ContractABI: [
    "function balanceOf(address _owner) view returns (uint256)",
    "function decimals() view returns (uint8)"]
});

chainsMap.set("Optimism", {
    InfuraId: `https://optimism-mainnet.infura.io/v3/${VITE_INFURA_ID}`,
    LogoFilepath: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.png",
    ContractABI: [
    "function balanceOf(address _owner) view returns (uint256)",
    "function decimals() view returns (uint8)"]
});

chainsMap.set("Blast", {
    InfuraId: `https://blast-mainnet.infura.io/v3/${VITE_INFURA_ID}`,
    LogoFilepath: "https://s3.coinmarketcap.com/static-gravity/image/b501162ffd4d4def9ee90f3ee630bde7.png",
    ContractABI: [
    "function balanceOf(address _owner) view returns (uint256)",
    "function decimals() view returns (uint8)"]
});

chainsMap.set("BSC", {
    InfuraId: `https://bsc-mainnet.infura.io/v3/${VITE_INFURA_ID}`,
    LogoFilepath: "https://seeklogo.com/images/B/binance-smart-chain-bsc-logo-9C34053D61-seeklogo.com.png",
    ContractABI: [
    "function balanceOf(address _owner) view returns (uint256)",
    "function decimals() view returns (uint8)"]
});

chainsMap.set("Base", {
    InfuraId: `https://base-mainnet.g.alchemy.com/v2/${VITE_ALCHEMY_ID}`,
    LogoFilepath: "https://moonpay-marketing-c337344.payloadcms.app/media/base%20logo.webp",
    ContractABI: [
    "function balanceOf(address _owner) view returns (uint256)",
    "function decimals() view returns (uint8)"]
});

chainsMap.set("Scroll", {
    InfuraId: `https://scroll-mainnet.g.alchemy.com/v2/${VITE_ALCHEMY_ID}`,
    LogoFilepath: "https://media.licdn.com/dms/image/v2/D4E0BAQF6gMSNL5xYCA/company-logo_200_200/company-logo_200_200/0/1692892037062/scroll_io_logo?e=2147483647&v=beta&t=cqtQxyxJY598hNzWczfysei_scAC_EAnMs0u3_ECufI",
    ContractABI: [
    "function balanceOf(address _owner) view returns (uint256)",
    "function decimals() view returns (uint8)"]
});

chainsMap.set("Solana", {
    InfuraId: `https://solana-mainnet.g.alchemy.com/v2/${VITE_ALCHEMY_ID}`,
    LogoFilepath: "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png",
    ContractABI: []
});