import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Poll } from '../interfaces/types';
import { chainsMap } from '../utils/Chains';

interface PollCardProps {
  poll: Poll;
}

const PollCard: React.FC<PollCardProps> = ({ poll }) => {
  const chainData = chainsMap.get(poll.chain);
  const navigate = useNavigate();

  const getPollStatus = () => {
    const now = new Date();
    const startDate = new Date(poll.startsAt);
    const endDate = new Date(poll.endsAt);

    if (now < startDate) {
      return (
        <div>
          <p>Poll Starts in:</p>
          {getTimeRemaining(now, startDate)}
          <br/>
        </div>
      );
    } else if (now < endDate) {
      return (
        <div>
          <p>Poll Ends in:</p>
          {getTimeRemaining(now, endDate)}
          <br/>
        </div>
      );
    } else {
      return <p>Poll has Ended</p>;
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
            <span style={{ "--value": minutes } as React.CSSProperties}></span>
          </span>
          min
        </div>
      </div>
    );
  };


  return (
    <div className="card card-bordered bg-base-100 dark:bg-gray-800 w-full max-w-md shadow-xl mx-auto">
    <figure className="px-4 pt-4 md:px-10 md:pt-10">
    {chainData && (
            <img 
              src={chainData.LogoFilepath}
              alt={`${poll.chain} logo`} 
              className="w-8 h-8"
            />
          )}
    </figure>
    <div className="card-body items-center text-center text-gray-900 dark:text-gray-100">
    <h2 className="card-title text-lg md:text-xl">{poll.statement}</h2>
    <br/>
      <div className="card-actions">
        <button className="btn btn-primary" onClick={() => navigate(`/polls/${poll.id}`)}>Go To Poll ({poll.id})</button>
      </div>
      <div className="card-body">
        <p>{getPollStatus()}</p>
      </div>
    </div>
  </div>
  );
};

export default PollCard;
