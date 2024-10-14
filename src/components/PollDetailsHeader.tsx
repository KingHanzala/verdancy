import React from 'react';
import { chainsMap } from '../utils/Chains';

interface Poll {
  // Define poll properties
  id: number;
  statement: string
  chain: string;
  tokenAddress: string;
  startsAt: string;
  endsAt: string;
  createdBy: string;
  // Add other properties as needed
}

interface PollDetailsHeaderProps {
  poll: Poll;
  hasVoted: boolean;
  votingPower: string | null;
  connectedWallet: any | null;
  isVotingPowerLoading: boolean;
}

const PollDetailsHeader: React.FC<PollDetailsHeaderProps> = ({ 
  poll, 
  hasVoted, 
  votingPower, 
  connectedWallet, 
  isVotingPowerLoading 
}) => {
  const chainInfo = chainsMap.get(poll.chain);

  const getPollStatus = (startTime:string, endTime:string) => {
    const now = new Date();
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    if (now < startDate) {
      return (
        <div>
          <div role='alert' className='alert'>Poll Starts in:
          {getTimeRemaining(now, startDate)}
          </div>
          <br/>
        </div>
      );
    } else if (now < endDate) {
      return (
        <div>
          <div role='alert' className='alert'>Poll Ends in:
          {getTimeRemaining(now, endDate)}
          </div>
          <br/>
        </div>
      );
    }
  };

  const getTimeRemaining = (from: Date, to: Date) => {
    const diff = to.getTime() - from.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return (
      <div className="flex gap-5">
        <div>
          <span className="countdown font-mono text-2xl">
            <span style={{ "--value": days }as React.CSSProperties}></span>
          </span>
          days
        </div>
        <div>
          <span className="countdown font-mono text-2xl">
            <span style={{ "--value": hours }as React.CSSProperties}></span>
          </span>
          hours
        </div>
        <div>
          <span className="countdown font-mono text-2xl">
            <span style={{ "--value": minutes }as React.CSSProperties}></span>
          </span>
          min
        </div>
      </div>
    );
  };

  return (
    <div className="mb-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="breadcrumbs text-sm">
        <ul>
          <li><a href="/polls">Polls</a></li>
          <li><a>Poll No. {poll.id}</a></li>
        </ul>
        <br/>
      </div>
      <div className='flex items-center'>
        <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">{poll.statement}</h2>
        {chainInfo && (
          <img src={chainInfo.LogoFilepath} alt={`${poll.chain} logo`} className="w-8 h-8 mb-2 ml-2" />
        )}
      </div>
      <br/>
        <p>{getPollStatus(poll.startsAt,poll.endsAt)}</p>
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 break-words"><span className="font-semibold">Token Address:</span> {poll.tokenAddress}</p>
      </div>
      {!hasVoted && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold">Your Voting Power:</span> {
              !connectedWallet
                ? '-'
                : isVotingPowerLoading 
                  ? 'No voting power'
                  : votingPower 
                    ? `${votingPower}` 
                    : 'No voting power'
            }
          </p>
        </div>
      )}
      <br/>
      <p className="text-sm text-gray-600 dark:text-gray-400 break-words"><span className="font-semibold">Created by:</span> {poll.createdBy}</p>
    </div>
  );
};

export default PollDetailsHeader;