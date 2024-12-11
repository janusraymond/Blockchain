require("dotenv/config");
require("@nomicfoundation/hardhat-toolbox");

const WALLET_SEP_BASE_PRIVATE_KEY = "fa84ed0397968066eb2b75819e8d4d3c44209381259d67381c6efa099521f9a7";
const BASE_SCAN_API_KEY = "WKARRX469CKPWQYPJPHSN43AEUYR8GKDD3";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  // defaultNetwork: 'coretest',
  sourcify: {
    enabled: true,
  },
  solidity: {
    version: "0.8.20",
    settings: {
      evmVersion: "paris",
    },
    compilers: [
      {
        version: "0.8.20",
        settings: {
          evmVersion: "paris",
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  ignition: {
    gasPrice: 100000000000,
  },
  etherscan: {
    apiKey: {
      baseSepolia: BASE_SCAN_API_KEY,
    },
    customChains: [
      {
        network: "basetest",
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://sepolia.basescan.org/",
        },
      },
    ],
  },
  networks: {
    basetest: {
      url: "https://sepolia.base.org",
      accounts: [WALLET_SEP_BASE_PRIVATE_KEY],
    }
  },
};