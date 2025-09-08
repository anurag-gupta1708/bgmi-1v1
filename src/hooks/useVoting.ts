import { useState, useEffect } from 'react';

interface VoteData {
  player1Votes: number;
  player2Votes: number;
}

interface BetData {
  player1Bets: number;
  player2Bets: number;
}

interface UserVote {
  voterName: string;
  votedFor: 'player1' | 'player2';
  timestamp: number;
}

interface UserBet {
  betterName: string;
  amount: number;
  betOn: 'player1' | 'player2';
  timestamp: number;
}

export const useVoting = () => {
  const [votes, setVotes] = useState<VoteData>({ player1Votes: 0, player2Votes: 0 });
  const [bets, setBets] = useState<BetData>({ player1Bets: 0, player2Bets: 0 });
  const [hasVoted, setHasVoted] = useState<string | null>(null);
  const [hasBet, setHasBet] = useState<string | null>(null);
  const [voterName, setVoterName] = useState<string>('');
  const [userVotes, setUserVotes] = useState<UserVote[]>([]);
  const [userBets, setUserBets] = useState<UserBet[]>([]);

  // Load votes and bets from localStorage on mount
  useEffect(() => {
    const savedVotes = localStorage.getItem('bgmi-votes');
    const savedBets = localStorage.getItem('bgmi-bets');
    const savedUserVote = localStorage.getItem('bgmi-user-vote');
    const savedUserBet = localStorage.getItem('bgmi-user-bet');
    const savedVoterName = localStorage.getItem('bgmi-voter-name');
    const savedUserVotes = localStorage.getItem('bgmi-user-votes');
    const savedUserBets = localStorage.getItem('bgmi-user-bets');
    
    if (savedVotes) {
      setVotes(JSON.parse(savedVotes));
    } else {
      // Initialize with some sample votes
      setVotes({ player1Votes: 0, player2Votes: 0 });
    }

    if (savedBets) {
      setBets(JSON.parse(savedBets));
    } else {
      // Initialize with some sample bets
      setBets({ player1Bets: 0, player2Bets: 0 });
    }
    
    if (savedUserVote) {
      setHasVoted(savedUserVote);
    }

    if (savedUserBet) {
      setHasBet(savedUserBet);
    }
    
    if (savedVoterName) {
      setVoterName(savedVoterName);
    }
    
    if (savedUserVotes) {
      setUserVotes(JSON.parse(savedUserVotes));
    }

    if (savedUserBets) {
      setUserBets(JSON.parse(savedUserBets));
    }
  }, []);

  // Save votes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('bgmi-votes', JSON.stringify(votes));
  }, [votes]);

  // Save bets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('bgmi-bets', JSON.stringify(bets));
  }, [bets]);

  // Save user votes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('bgmi-user-votes', JSON.stringify(userVotes));
  }, [userVotes]);

  // Save user bets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('bgmi-user-bets', JSON.stringify(userBets));
  }, [userBets]);

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

  const placeBet = (player: 'player1' | 'player2', amount: number) => {
    if (hasBet || !voterName || amount <= 0) return; // Prevent double betting or betting without name

    const newUserBet: UserBet = {
      betterName: voterName,
      amount,
      betOn: player,
      timestamp: Date.now()
    };

    setBets(prev => ({
      ...prev,
      [player === 'player1' ? 'player1Bets' : 'player2Bets']: 
        prev[player === 'player1' ? 'player1Bets' : 'player2Bets'] + amount
    }));

    setUserBets(prev => [...prev, newUserBet]);
    setHasBet(player);
    localStorage.setItem('bgmi-user-bet', player);
  };

  const getTotalVotes = () => votes.player1Votes + votes.player2Votes;
  const getTotalBets = () => bets.player1Bets + bets.player2Bets;
  
  const getPercentage = (playerVotes: number) => {
    const total = getTotalVotes();
    return total === 0 ? 0 : Math.round((playerVotes / total) * 100);
  };

  const getBettingPercentage = (playerBets: number) => {
    const total = getTotalBets();
    return total === 0 ? 0 : Math.round((playerBets / total) * 100);
  };

  return {
    votes,
    bets,
    hasVoted,
    hasBet,
    voterName,
    userVotes,
    userBets,
    vote,
    placeBet,
    setVoterNameAndSave,
    getTotalVotes,
    getTotalBets,
    getPercentage,
    getBettingPercentage,
  };
};