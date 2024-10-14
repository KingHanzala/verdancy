import React from 'react';

interface VoteButtonProps {
  handleVoteSubmit: () => void;
  isVotingOpen: boolean;
  selectedOption: number | null;
  isEligible: boolean | null;
  hasVoted: boolean;
  hasEnded: boolean;
}

const VoteButton: React.FC<VoteButtonProps> = ({ handleVoteSubmit, isVotingOpen, selectedOption, isEligible, hasVoted, hasEnded }) => {
  return (
    <button
      onClick={handleVoteSubmit}
      disabled={selectedOption === null || !isVotingOpen || !isEligible || hasVoted}
      className={`w-full py-2 px-4 rounded-md text-white dark:text-gray-200 font-semibold ${
        isVotingOpen && selectedOption !== null && isEligible && !hasVoted
          ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800'
          : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
      }`}
    >
      {hasEnded ? 'Poll Ended' : isVotingOpen ? 'Submit Vote' : 'Voting not started yet'}
    </button>
  );
};

export default VoteButton;