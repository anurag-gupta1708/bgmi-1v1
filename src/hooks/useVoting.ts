import { useState, useEffect } from 'react';

interface VoteData {
  player1Votes: number;
  player2Votes: number;
}

interface UserVote {
  voterName: string;
  votedFor: 'player1' | 'player2';
  timestamp: number;
}

export const useVoting = () => {
  const [votes, setVotes] = useState<VoteData>({ player1Votes: 0, player2Votes: 0 });
  const [hasVoted, setHasVoted] = useState<string | null>(null);
  const [voterName, setVoterName] = useState<string>('');
  const [userVotes, setUserVotes] = useState<UserVote[]>([]);

  // Load votes from localStorage on mount
  useEffect(() => {
    const savedVotes = localStorage.getItem('bgmi-votes');
    const savedUserVote = localStorage.getItem('bgmi-user-vote');
    const savedVoterName = localStorage.getItem('bgmi-voter-name');
    const savedUserVotes = localStorage.getItem('bgmi-user-votes');
    
    if (savedVotes) {
      setVotes(JSON.parse(savedVotes));
    } else {
      // Initialize with some sample votes
      setVotes({ player1Votes: 45, player2Votes: 38 });
    }
    
    if (savedUserVote) {
      setHasVoted(savedUserVote);
    }
    
    if (savedVoterName) {
      setVoterName(savedVoterName);
    }
    
    if (savedUserVotes) {
      setUserVotes(JSON.parse(savedUserVotes));
    }
  }, []);

  // Save votes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('bgmi-votes', JSON.stringify(votes));
  }, [votes]);

  // Save user votes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('bgmi-user-votes', JSON.stringify(userVotes));
  }, [userVotes]);

  const setVoterNameAndSave = (name: string) => {
    setVoterName(name);
    localStorage.setItem('bgmi-voter-name', name);
  };

  const vote = (player: 'player1' | 'player2') => {
    if (hasVoted || !voterName) return; // Prevent double voting or voting without name

    const newUserVote: UserVote = {
      voterName,
      votedFor: player,
      timestamp: Date.now()
    };

    setVotes(prev => ({
      ...prev,
      [player === 'player1' ? 'player1Votes' : 'player2Votes']: 
        prev[player === 'player1' ? 'player1Votes' : 'player2Votes'] + 1
    }));

    setUserVotes(prev => [...prev, newUserVote]);
    setHasVoted(player);
    localStorage.setItem('bgmi-user-vote', player);
  };

  const getTotalVotes = () => votes.player1Votes + votes.player2Votes;
  
  const getPercentage = (playerVotes: number) => {
    const total = getTotalVotes();
    return total === 0 ? 0 : Math.round((playerVotes / total) * 100);
  };

  return {
    votes,
    hasVoted,
    voterName,
    userVotes,
    vote,
    setVoterNameAndSave,
    getTotalVotes,
    getPercentage,
  };
};