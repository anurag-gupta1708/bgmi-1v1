import { useState, useEffect } from 'react';

interface VoteData {
  player1Votes: number;
  player2Votes: number;
}

export const useVoting = () => {
  const [votes, setVotes] = useState<VoteData>({ player1Votes: 0, player2Votes: 0 });
  const [hasVoted, setHasVoted] = useState<string | null>(null);

  // Load votes from localStorage on mount
  useEffect(() => {
    const savedVotes = localStorage.getItem('bgmi-votes');
    const savedUserVote = localStorage.getItem('bgmi-user-vote');
    
    if (savedVotes) {
      setVotes(JSON.parse(savedVotes));
    } else {
      // Initialize with some sample votes
      setVotes({ player1Votes: 45, player2Votes: 38 });
    }
    
    if (savedUserVote) {
      setHasVoted(savedUserVote);
    }
  }, []);

  // Save votes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('bgmi-votes', JSON.stringify(votes));
  }, [votes]);

  const vote = (player: 'player1' | 'player2') => {
    if (hasVoted) return; // Prevent double voting

    setVotes(prev => ({
      ...prev,
      [player === 'player1' ? 'player1Votes' : 'player2Votes']: 
        prev[player === 'player1' ? 'player1Votes' : 'player2Votes'] + 1
    }));

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
    vote,
    getTotalVotes,
    getPercentage,
  };
};