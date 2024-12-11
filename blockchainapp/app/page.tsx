"use client";
import { useState } from "react";
import { BrowserProvider } from "ethers";
import { getContract } from "./utils";

interface EthereumProvider {
  request: (request: {
    method: string;
    params?: Array<
      | string
      | {
          nativeCurrency?: {
            name: string;
            symbol: string;
            decimals: number;
          };
          rpcUrls?: string[];
          chainId: string;
          chainName?: string;
        }
    >;
  }) => Promise<string[]>;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

export default function Home() {
  const [walletKey, setWalletKey] = useState("");
  const [depositAmount, setDepositAmount] = useState(0);

  const connectWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18,
              },
              rpcUrls: ["https://sepolia.base.org"],
              chainId: "0x14a34",
              chainName: "Base Sepolia Testnet",
            },
          ],
        });

        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletKey(accounts[0]);

        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x14a34" }],
        });
      } catch (error) {
        console.error("Wallet connection error:", error);
        alert("Failed to connect wallet. Please try again.");
      }
    } else {
      alert("Ethereum wallet not detected. Please install MetaMask.");
    }
  };

  const sendMsg = async (message: string) => {
    const ethereum = window.ethereum;
    if (!ethereum) {
      alert("Ethereum wallet not detected.");
      return;
    }
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.sendMessage(message);
      await tx.wait();
    } catch (error) {
      alert(`Minting failed: ${error}`);
    }
  };

  const getMessage = async () => {
    const ethereum = window.ethereum;
    if (!ethereum) {
      alert("Ethereum wallet not detected.");
      return;
    }
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const interest = await contract.getMessages(walletKey);
      alert(`Accumulated Interest: ${interest}`);
    } catch (error) {
      alert(`Fetching failed: ${error}`);
    }
  };

  const [message, setMessage] = useState("");

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
         <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-max">
           <div className="grid grid-cols-1 gap-6">
             <div>
                 <input 
                  type="text" 
                  name="amount" 
                  className="w-full border rounded-lg p-2 mb-4 focus:outline-none focus:ring focus:ring-blue-300 text-center">
                </input>
                
                <button
                  onClick={() => {
                    {walletKey !== "" && (
                      sendMsg(message)
                    )}
                    {walletKey === "" && connectWallet()}
                  }}
                  className="w-full bg-blue-500 hover:scale-95 transition-all duration-75 ease-in px-5 py-2 rounded-md text-white">
                  {walletKey !== "" && (
                    <>
                      <span className="text-xl"> SEND </span>
                    </>
                  )}
                  {walletKey === "" && <span className="">CONNECT WALLET</span>}
                </button>
               
            </div>
            <div className="block text-2xl text-green-600">
              {walletKey !== "" && (
                <>
                  <span> CONNECTED WALLET: </span>
                  <span>{walletKey}</span>
                </>
              )}
            </div>
            <div className="block text-2xl">
              {walletKey !== "" && (
                <>
                  <span> MESSAGES: </span>
                  <div className="block text-2xl">
                    {message}
                  </div>
                </>
              )}
            </div>
          </div>
      </div>
    </div>
  );
}