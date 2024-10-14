import React from 'react';

interface OptionsTableProps {
  pollOptions: { id: number; optionLabel: string; optionValue: number }[];
  hasEnded: boolean;
}

const OptionsTable: React.FC<OptionsTableProps> = ({ pollOptions, hasEnded }) => {
  const sortedOptions = [...pollOptions].sort((a, b) => b.optionValue - a.optionValue);

  return (
    <div className="mt-4 border border-gray-300 rounded-lg overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="text-left py-3 px-4 font-semibold border-b border-r border-gray-300 dark:border-gray-600">Option</th>
            <th className="text-right py-3 px-4 font-semibold border-b border-gray-300 dark:border-gray-600">Votes</th>
          </tr>
        </thead>
        <tbody>
          {sortedOptions.map((option, index) => (
            <tr 
              key={option.id} 
              className={`
                ${index === 0 && hasEnded ? 'bg-green-100 dark:bg-green-800' : 'bg-white dark:bg-gray-800'}
              `}
            >
              <td className="py-3 px-4 border-b border-r border-gray-300 dark:border-gray-600">{option.optionLabel}</td>
              <td className="text-right py-3 px-4 border-b border-gray-300 dark:border-gray-600">{option.optionValue.toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OptionsTable;
