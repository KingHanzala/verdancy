import React, { useState } from 'react';
import axios from 'axios';
import { getBackendURL } from '../config';
import { Poll, PollOption } from '../interfaces/types';
import PollCard from './PollCard';
import FeaturedPolls from './FeaturedPolls';
import { featuredPollIds } from '../utils/utils';

const backendURL = getBackendURL();

interface ApiResponse {
  poll: Poll;
  pollOptions: PollOption[];
}

const AllPolls: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError('Please enter a poll ID');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSearchResult(null);

    try {
      if (featuredPollIds.includes(Number(searchTerm))) {
        setError("This Poll is already featured below");
      } else {
      const response = await axios.get(`${backendURL}/api/polls/${searchTerm}`);
      console.log('API response:', response.data); // For debugging

      // Parse the JSON string in the response
      const parsedData: ApiResponse = JSON.parse(response.data);
      console.log('Parsed data:', parsedData); // For debugging

      if (parsedData.poll && parsedData.poll.id) {
        setSearchResult(parsedData);
        console.log('Search result:', parsedData); // For debugging
      } else {
        setError('No poll found with the given ID');
      }
    }
    } catch (err) {
      console.error('Error searching for poll:', err);
      setError('Failed to search for poll. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-8 p-6 pt-20 dark:bg-gray-800">
      <div className="max-w-xl mx-auto">
        <div className="flex items-center mb-6">
          <input
            type="text"
            placeholder="Enter Poll ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        {isLoading && <p className="text-center dark:text-gray-300">Searching...</p>}

        {error && <p className="text-red-500 text-center mb-4 dark:text-red-400">{error}</p>}

        {searchResult && (
          <div className='pb-10'>
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Search Result:</h2>
            <PollCard poll={searchResult.poll} />
          </div>
        )}
      </div>
      <div className="max-w-xl mx-auto">
        <FeaturedPolls/>
      </div>
    </div>
  );
};

export default AllPolls;
