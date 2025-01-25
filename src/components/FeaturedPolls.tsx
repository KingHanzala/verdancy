import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Poll, PollOption } from '../interfaces/types';
import PollCard from './PollCard';
import getBackendURL from '../config';

const backendURL = getBackendURL();

interface ApiResponse {
    poll: Poll;
    pollOptions: PollOption[];
  }

const FeaturedPollsList: React.FC = () => {
  const [polls, setPolls] = useState<ApiResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const countResp = await axios.get(`${backendURL}/api/pollsCount`)
        console.log(countResp)
        const count = countResp.data.count
        const featuredPollIds = [];
        for (let i = count; i > count - 10; i--) {
          featuredPollIds.push(i);
        }
        console.log(featuredPollIds)
        const pollPromises = featuredPollIds.map(id =>
          axios.get(`${backendURL}/api/polls/${id}`).then(response => JSON.parse(response.data))
        );
        const fetchedPolls = await Promise.all(pollPromises);
        setPolls(fetchedPolls);
      } catch (err) {
        console.error('Error fetching polls:', err);
        setError('Failed to load featured polls. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPolls();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2 className="text-center text-2xl font-bold my-4">Featured Polls</h2>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        {polls.map(resp => (
          <PollCard key={resp.poll.id} poll={resp.poll} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedPollsList;
