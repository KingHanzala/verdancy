// API Interfaces
export interface AlreadyVotedRequest {
    pollId: number;
    walletAddress: string;
  }
  
  export interface AlreadyVotedResponse {
    voted: boolean;
    choiceVal: number;
  }
  
  export interface CreatePollRequest {
    createdBy: string;
    tokenAddress: string;
    chain: string;
    pollStatement: string;
    pollOptions: string[];
    startsAt: string;
    endsAt: string;
  }
  
  export interface CreatePollResponse {
    message: string;
    pollId: number;
  }
  
  export interface CastVoteRequest {
    pollId: number;
    walletAddress: string;
    pollChoice: {
      optionId: number;
      choiceValue: number;
    };
  }
  
  export interface CastVoteResponse {
    message: string;
  }
  
  // Component Interfaces
  export interface Poll {
    id: number;
    statement: string;
    tokenAddress: string;
    chain: string;
    startsAt: string;
    endsAt: string;
    createdBy: string;
  }
  
  export interface PollOption {
    id: number;
    optionLabel: string;
    optionValue?: number;
  }