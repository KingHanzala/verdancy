import React from 'react';

interface EligibilityCheckProps {
  connectedWallet: any | null;
  hasVoted: boolean;
  isEligible: boolean | null;
  checkEligibility: () => void;
  hasEnded: boolean;
}

const EligibilityCheck: React.FC<EligibilityCheckProps> = ({ connectedWallet, hasVoted, isEligible, checkEligibility, hasEnded }) => {
  if (hasEnded) return null;

  return (
    <div className="mb-6">
      <button
        onClick={checkEligibility}
        disabled={!connectedWallet || hasVoted || isEligible !== null}
        className={`w-full py-2 px-4 mb-4 rounded-md text-white font-semibold ${
          connectedWallet && !hasVoted && isEligible === null
            ? 'bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800'
            : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
        }`}
      >
        {isEligible !== null ? 'Eligibility Checked' : 'Check Eligibility'}
      </button>
      {hasVoted && (
        <p className={`text-center ${hasVoted ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          You have already voted
        </p>
      )}
      {isEligible !== null && !hasVoted && (
        <p className={`text-center ${isEligible ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {isEligible ? 'You are eligible to vote.' : 'You are ineligible to vote.'}
        </p>
      )}
    </div>
  );
};

export default EligibilityCheck;