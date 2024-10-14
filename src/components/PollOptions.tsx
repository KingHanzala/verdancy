import React from 'react';
import { PollOption } from '../interfaces/types';

interface PollOptionsProps {
  pollOptions: PollOption[];
  isVotingOpen: boolean;
  setSelectedOption: (optionId: number) => void;
  hasEnded: boolean;
}

const PollOptions: React.FC<PollOptionsProps> = ({ pollOptions, isVotingOpen, setSelectedOption, hasEnded }) => {
  if (hasEnded) return null;

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">Options:</h3>
      {pollOptions.length > 0 ? (
        <ul className="space-y-2">
          {pollOptions.map((option) => (
            <li key={option.id} className="flex items-center">
              <input
                type="radio"
                id={`option-${option.id}`}
                name="pollOption"
                value={option.id}
                onChange={() => setSelectedOption(option.id)}
                className="mr-2 dark:bg-gray-700 dark:border-gray-600"
                disabled={!isVotingOpen}
              />
              <label htmlFor={`option-${option.id}`} className="flex-grow">
                <span className="text-gray-800 dark:text-gray-200">{option.optionLabel}</span>
              </label>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">No options available for this poll.</p>
      )}
    </div>
  );
};

export default PollOptions;