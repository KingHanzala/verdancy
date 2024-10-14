import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getBackendURL } from '../config';

interface TotalParticipantsProps {
  pollId: number;
}

const TotalParticipants: React.FC<TotalParticipantsProps> = ({ pollId }) => {
  const [totalParticipants, setTotalParticipants] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTotalParticipants = async () => {
      try {
        const response = await axios.post(`${getBackendURL()}/api/totalParticipation`, { pollId });
        setTotalParticipants(response.data.totalParticipation);
      } catch (err) {
        console.error('Error fetching total participants:', err);
        setError('Failed to fetch total participants');
      }
    };

    fetchTotalParticipants();
  }, [pollId]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (totalParticipants === null) return <p>Loading participants...</p>;

  return (
    <p className="text-center mb-4">
      Total Participants: <span className="font-bold">{totalParticipants}</span>
    </p>
  );
};

export default TotalParticipants;
