import React, { useState } from "react";
import axios from "axios";
import { PlusIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { chainsMap } from "../utils/Chains";
import { ethers } from "ethers";
import Cookies from 'js-cookie';
import getBackendURL from "../config";
import { Connection, PublicKey } from "@solana/web3.js";
import { useAppKitAccount, useAppKitNetwork } from '@reown/appkit/react'

const CreatePollForm = () => {
  const [boxes, setBoxes] = useState([{ id: 1, value: "" }, { id: 2, value: "" }]); // Initialize with two options
  const [pollStatement, setPollStatement] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [chain, setChain] = useState(""); // default option
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date(new Date().getTime() + 3600 * 1000));
  const backendURL = getBackendURL();
  const [pollId, setPollId] = useState<string | null>(null);
  const { address, isConnected } = useAppKitAccount();
  const { caipNetwork } = useAppKitNetwork();
  const handleAddBox = () => {
    if (boxes.length < 4) {
      setBoxes([...boxes, { id: boxes.length + 1, value: "" }]);
    }
  };

  const handleRemoveBox = (id: number) => {
    if (boxes.length > 2) { // Prevent removing if only two options are left
      setBoxes(boxes.filter((box) => box.id !== id));
    }
  };

  const handleInputChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedBoxes = boxes.map((box) =>
      box.id === id ? { ...box, value: event.target.value } : box
    );
    setBoxes(updatedBoxes);
  };

  const validatePoll = async (tokenAddress: string, chain: string): Promise<boolean> => {
    try {
      const walletAddress = address;
      if (!isConnected || !walletAddress) {
        setError('Wallet not connected. Please connect your wallet first.');
        return false;
      }
      const response = await axios.post(`${backendURL}/api/earlyUser`, {
        walletAddress: walletAddress
      });

      const res = response.data;
      console.log(res);

      const chainData = chainsMap.get(chain);
      console.log(chain + " " + tokenAddress);
      if (res.earlyUser && chainData) {
        if (chain.toLowerCase() === "solana") {
          // Solana token validation
          if(!caipNetwork?.id.startsWith("solana")) {
            setError('Incorrect network selected. Please switch to Solana.');
            return false;
          }
          const connection = new Connection(chainData.InfuraId);
          const publicKey = new PublicKey(walletAddress);
          try {
            if (tokenAddress.toLowerCase() === "default") {
              // Check SOL balance
              const balance = await connection.getBalance(publicKey);
              console.log("SOL balance:", balance);
              return balance > 0; // Return true if balance is greater than 0
            } else {
              // Check SPL token balance
              const tokenPublicKey = new PublicKey(tokenAddress);
              const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, { mint: tokenPublicKey });
              const balance = tokenAccounts.value.reduce((acc: any, account: any) => {
                const tokenAmount = account.account.data.parsed.info.tokenAmount;
                return acc.add(ethers.BigNumber.from(tokenAmount.amount));
              }, ethers.BigNumber.from(0));
              console.log("Token balance:", balance.toString());
              return balance.gt(0); // Return true if balance is greater than 0
            }
          } catch (e) {
            console.error("Error validating poll on Solana:", e);
            return false;
          }
        } else {
          // Ethereum token validation
          const provider = new ethers.providers.JsonRpcProvider(chainData.InfuraId);
          console.log(provider);
          try {
            if (tokenAddress.toLowerCase() === "default") {
              // Check ETH balance
              const balance = await provider.getBalance(walletAddress);
              console.log("ETH balance:", balance.toString());
              return balance.gt(0); // Return true if balance is greater than 0
            } else {
              // Check ERC20 token balance
              const abi = chainData.ContractABI as string[];
              const contract = new ethers.Contract(tokenAddress, abi, provider);
              const balance = await contract.balanceOf(walletAddress);
              console.log("Token balance:", balance.toString());
              return balance.gt(0); // Return true if balance is greater than 0
            }
          } catch (e) {
            console.error("Error validating poll:", e);
            return false;
          }
        }
      }
      return false;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        setError("Early user validation service is currently unavailable. Please try again later.");
      } else {
        setError("An error occurred while validating the poll. Please try again.");
      }
      console.error("Error validating poll:", err);
      return false;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate form inputs
    if (!pollStatement || !tokenAddress || !chain || boxes.some((box) => !box.value) || !startDate || !endDate) {
      setError("All fields are required.");
      return;
    }

    if (startDate >= endDate) {
      setError("End time must be after start time.");
      return;
    }

    try {
      const walletAddress = Cookies.get('walletAddress') || '';
      const validateResponse = await validatePoll(tokenAddress, chain);

      if (validateResponse) {
        // Send the create poll request to the backend
        const createPollResponse = await axios.post(`${backendURL}/api/createPoll`, {
          createdBy: walletAddress, // Set this to the connected wallet address
          tokenAddress,
          chain,
          pollStatement,
          pollOptions: boxes.map(box => box.value),
          startsAt: startDate.toISOString(),
          endsAt: endDate.toISOString(),
        });

        setSuccess(createPollResponse.data.message);
        setPollId(createPollResponse.data.pollId);
        window.open(`${window.location.origin}/polls/${createPollResponse.data.pollId}`, '_blank');
      } else if (!error) {
        setError("Poll validation failed. You may not be eligible to create a poll.");
      }
    } catch (err) {
      if (!error) {
        setError("Failed to create poll. Please try again.");
      }
    }
  };

  const closeMessage = (type: 'error' | 'success') => {
    if (type === 'error') {
      setError(null);
    } else {
      setSuccess(null);
    }
  };

  const copyPollLink = () => {
    if (pollId) {
      const pollLink = `${window.location.origin}/polls/${pollId}`;
      navigator.clipboard.writeText(pollLink);
      alert('Poll link copied to clipboard!');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="bg-gray-100 dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Create Poll</h2>
          
          {error && (
            <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <XMarkIcon className="fill-current h-6 w-6 text-red-500 dark:text-red-400 cursor-pointer" onClick={() => closeMessage('error')} />
              </span>
            </div>
          )}
          {success && (
            <div className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-200 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{success}</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <XMarkIcon className="fill-current h-6 w-6 text-green-500 dark:text-green-400 cursor-pointer" onClick={() => closeMessage('success')} />
              </span>
            </div>
          )}
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="chain" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Chain
              </label>
              <div className="relative">
                <select
                  id="chain"
                  name="chain"
                  value={chain}
                  onChange={(e) => setChain(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white appearance-none pr-10"
                >
                  <option value="" disabled>Select a chain</option>
                  {[...chainsMap.keys()].map((chainKey) => (
                    <option key={chainKey} value={chainKey}>
                      {chainKey}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="token-address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Token Address
              </label>
              <input
                id="token-address"
                name="token-address"
                type="text"
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="poll-statement" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Poll Statement
              </label>
              <input
                id="poll-statement"
                name="poll-statement"
                type="text"
                value={pollStatement}
                onChange={(e) => setPollStatement(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="poll-options" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Poll Options (Min 2, Max 4)
              </label>
              <div className="space-y-2">
                {boxes.map((box) => (
                  <div key={box.id} className="flex items-center">
                    <input
                      type="text"
                      value={box.value}
                      onChange={(e) => handleInputChange(box.id, e)}
                      className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      placeholder={`Option ${box.id}`}
                    />
                    {box.id > 2 && ( // Show delete icon only for options beyond the initial two
                      <button
                        type="button"
                        onClick={() => handleRemoveBox(box.id)}
                        className="ml-2 text-red-600 hover:text-red-800"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {boxes.length < 4 && (
                <button
                  type="button"
                  onClick={handleAddBox}
                  className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <PlusIcon className="h-5 w-5 mr-1" />
                  Add Option
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Start Time
                </label>
                <DatePicker
                  id="start-date"
                  selected={startDate}
                  onChange={(date: Date | null) => setStartDate(date)}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  End Time
                </label>
                <DatePicker
                  id="end-date"
                  selected={endDate}
                  onChange={(date: Date | null) => setEndDate(date)}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 mt-6">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              Create Poll
            </button>
          </div>

          {pollId && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Poll created successfully! View it here:</p>
              <div className="flex items-center mt-2">
                <input
                  type="text"
                  readOnly
                  value={`${window.location.origin}/polls/${pollId}`}
                  className="flex-grow px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-l-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                />
                <button
                  type="button"
                  onClick={copyPollLink}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-r-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default CreatePollForm;
