import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import { chainsMap } from "../utils/Chains";
import PollDetailsHeader from './PollDetailsHeader';
import PollOptions from './PollOptions';
import EligibilityCheck from './EligibilityCheck';
import VoteButton from './VoteButton';
import PieChart from './PieChart'; // Import PieChart component
import { getBackendURL } from '../config';
import { Poll, PollOption } from '../interfaces/types';
import { useAppKitAccount} from '@reown/appkit/react'
import { Connection, PublicKey } from "@solana/web3.js"; // Import Solana dependencies
import OptionsTable from './OptionsTable'; // Add this import

const backendURL = getBackendURL(); // Add backendURL variable

const PollDetails = () => {
  const { pollId } = useParams<{ pollId: string }>();
  const [poll, setPoll] = useState<Poll | null>(null);
  const [pollOptions, setPollOptions] = useState<PollOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime] = useState(new Date());
  const [votingPower, setVotingPower] = useState<string | null>(null);
  const { address} = useAppKitAccount();
  const [isVotingPowerLoading, setIsVotingPowerLoading] = useState(true);
  const [isEligible, setIsEligible] = useState<boolean | null>(null);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [_votedValue, setVotedValue] = useState<number | null>(null);
  const [_hasStarted, setHasStarted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  const getBalance = async (walletAddress: string): Promise<{ balance: ethers.BigNumber | null, decimals: number | null }> => {
    if (!poll || hasVoted) return { balance: null, decimals: null };

    const chainData = chainsMap.get(poll.chain);
    if (!chainData) {
      console.error(`Chain data not found for ${poll.chain}`);
      return { balance: null, decimals: null };
    }

    try {
      if (poll.chain.toLowerCase() === "solana") {
        // Solana token validation
        const connection = new Connection(chainData.InfuraId);
        const publicKey = new PublicKey(walletAddress);
        if (poll.tokenAddress.toLowerCase() === "default") {
          // Check SOL balance
          const balance = await connection.getBalance(publicKey);
          console.log("SOL balance:", balance);
          return { balance: ethers.BigNumber.from(balance), decimals: 9 }; // SOL has 9 decimals
        } else {
          // Check SPL token balance
          const tokenPublicKey = new PublicKey(poll.tokenAddress);
          const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, { mint: tokenPublicKey });
          const balance = tokenAccounts.value.reduce((acc: any, account: any) => {
            const tokenAmount = account.account.data.parsed.info.tokenAmount;
            return acc.add(ethers.BigNumber.from(tokenAmount.amount));
          }, ethers.BigNumber.from(0));
          const decimals = tokenAccounts.value[0]?.account.data.parsed.info.tokenAmount.decimals || 9; // Use the decimals from the token account
          console.log("Token balance:", balance.toString());
          return { balance, decimals }; // SPL tokens typically have 9 decimals
        }
      } else {
        // Ethereum token validation
        const provider = new ethers.providers.JsonRpcProvider(chainData.InfuraId);
        if (poll.tokenAddress.toLowerCase() === "default") {
          // Check ETH balance
          const balance = await provider.getBalance(walletAddress);
          console.log("ETH balance:", balance.toString());
          return { balance, decimals: 18 }; // ETH has 18 decimals
        } else {
          // Check ERC20 token balance
          const abi = chainData.ContractABI as string[];
          const contract = new ethers.Contract(poll.tokenAddress, abi, provider);
          const balance = await contract.balanceOf(walletAddress);
          const decimals = await contract.decimals();
          return { balance, decimals };
        }
      }
    } catch (error) {
      console.error("Error getting balance or decimals:", error);
      return { balance: null, decimals: null };
    }
  };

  const fetchPollDetails = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/polls/${pollId}`); // Update axios call
      const res = JSON.parse(response.data);
      const pollData = res.poll;
      const pollOptionsData = res.pollOptions;

      setPoll(pollData);
      setPollOptions(pollOptionsData);
    } catch (err) {
      setError('Failed to fetch poll details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const checkEligibility = async () => {
    if (!address || !poll) return;
    const voted = await checkIfAlreadyVoted(address);
    if (voted || hasVoted) return;
    setIsVotingPowerLoading(true);
    const { balance, decimals } = await getBalance(address);
    if (balance !== null && decimals !== null) {
      const formattedBalance = ethers.utils.formatUnits(balance, decimals);
      setVotingPower(formattedBalance);
      setIsEligible(balance.gt(0));
    } else {
      setVotingPower('0');
      setIsEligible(false);
    }
    setIsVotingPowerLoading(false);
  };

  const checkIfAlreadyVoted = async (walletAddress: string) => {
    if (!poll || !walletAddress) return false;

    try {
      const response = await axios.post(
        `${backendURL}/api/alreadyVoted`, // Update axios call
        { 
          pollId: poll.id, 
          walletAddress: walletAddress.toLowerCase()
        }
      );
      const { voted, choiceVal } = JSON.parse(response.data);
      setHasVoted(voted);
      setVotedValue(choiceVal);
      if (voted) {
        setIsEligible(true); // If they've voted, they were eligible
        setVotingPower(choiceVal.toString());
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error checking if already voted:', error);
    }
  };

  useEffect(() => {
    fetchPollDetails();
  }, [pollId]);

  useEffect(() => {
    if (address) {
      updateVotingPower(address);
    } else {
      setVotingPower(null);
      setIsEligible(null);
    }
  }, [address, poll]);

  const updateVotingPower = async (walletAddress: string) => {
    if (!poll) return;
    const voted = await checkIfAlreadyVoted(walletAddress);
    if (voted || hasVoted) return;
    setIsVotingPowerLoading(true);
    const { balance, decimals } = await getBalance(walletAddress);
    if (balance !== null && decimals !== null) {
      const formattedBalance = ethers.utils.formatUnits(balance, decimals);
      setVotingPower(formattedBalance);
    } else {
      setVotingPower('0');
    }
    setIsVotingPowerLoading(false);
  };

  const handleVoteSubmit = async () => {
    if (!address || selectedOption === null || !poll || hasVoted || !isEligible) {
      setError('Invalid submission state');
      return;
    }

    try {
      const { balance, decimals } = await getBalance(address);
      if (balance === null || decimals === null) {
        setError('Failed to get balance or decimals');
        return;
      }

      const balanceNumber = parseFloat(ethers.utils.formatUnits(balance, decimals));

      const voteData = {
        pollId: poll.id,
        walletAddress: address.toLowerCase(),
        pollChoice: {
          optionId: selectedOption,
          choiceValue: balanceNumber
        },
      };

      const response = await axios.post(
        `${backendURL}/api/castVote`, // Update axios call
        voteData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      console.log(response.data);

      // Update pollOptions with the new vote
      setPollOptions(prevOptions => 
        prevOptions.map(option => 
          option.id === selectedOption
            ? { ...option, optionValue: (option.optionValue || 0) + balanceNumber }
            : option
        )
      );

      setHasVoted(true);
      setVotedValue(balanceNumber);

    } catch (err) {
      console.error('Error submitting vote:', err);
      if (axios.isAxiosError(err)) {
        setError(`Failed to submit vote: ${err.response?.data?.message || err.message}`);
      } else {
        setError('Failed to submit vote: Unknown error');
      }
    }
  };

  useEffect(() => {
    const updatePollStatus = () => {
      if (poll) {  // Add this check
        const now = new Date();
        setHasStarted(now >= new Date(poll.startsAt));
        setHasEnded(now > new Date(poll.endsAt));
      }
    };

    updatePollStatus();
    const intervalId = setInterval(updatePollStatus, 1000); // Update every second

    return () => clearInterval(intervalId);
  }, [poll]);  // Add poll to the dependency array

  if (loading) return <div className="flex justify-center items-center h-screen"><p className="text-xl">Loading...</p></div>;
  if (!loading && !poll) return <div className="flex justify-center items-center h-screen"><p className="text-xl">Poll not found</p></div>;

  if (error) return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert"><p>{error}</p></div>;

  const isVotingOpen = poll ? new Date(poll.startsAt) <= currentTime && currentTime <= new Date(poll.endsAt) : false;

  return (
    <div className="container mx-auto mt-8 p-6">
      <div className="lg:flex lg:space-x-8">
        <div className="lg:w-1/2">
          <div className="rounded-lg shadow-lg bg-white dark:bg-gray-800 text-black dark:text-white p-6">
            <PollDetailsHeader poll={poll!} hasVoted={hasVoted} votingPower={votingPower} connectedWallet={address} isVotingPowerLoading={isVotingPowerLoading} />
            <EligibilityCheck connectedWallet={address} hasVoted={hasVoted} isEligible={isEligible} checkEligibility={checkEligibility} hasEnded={hasEnded} />
            {!hasVoted && <PollOptions pollOptions={pollOptions} isVotingOpen={isVotingOpen} setSelectedOption={setSelectedOption} hasEnded={hasEnded} />}
            {!hasVoted && <VoteButton handleVoteSubmit={handleVoteSubmit} isVotingOpen={isVotingOpen} selectedOption={selectedOption} isEligible={isEligible} hasVoted={hasVoted} hasEnded={hasEnded} />}
          </div>
        </div>
        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <div className="rounded-lg shadow-lg bg-white dark:bg-gray-800 text-black dark:text-white p-6 mx-auto max-w-md">
            <h2 className="text-xl font-bold text-center mb-4">{hasEnded ? "Final Poll Results" : "Current Poll Standings"}</h2>
            <div className="flex flex-col items-center justify-center">
              {(hasVoted || pollOptions.some(option => option.optionValue !== undefined && option.optionValue > 0)) ? (
                <>
                  <PieChart pollOptions={pollOptions.map(option => ({
                    id: option.id,
                    optionLabel: option.optionLabel,
                    optionValue: option.optionValue || 0
                  }))} />
                  <OptionsTable 
                    pollOptions={pollOptions.map(option => ({
                      id: option.id,
                      optionLabel: option.optionLabel,
                      optionValue: option.optionValue || 0
                    }))} 
                    hasEnded={hasEnded}
                  />
                </>
              ) : (
                <p className="text-center text-gray-600 dark:text-gray-300">No votes have been cast yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollDetails;
