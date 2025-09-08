import { useEffect, useState } from "react";

interface VoteData { player1Votes: number; player2Votes: number; }
interface BetData { player1Bets: number; player2Bets: number; }

interface UserVote {
  voterName: string;
  votedFor: "player1" | "player2";
  timestamp: string | number;
}

interface UserBet {
  betterName: string;
  amount: number;
  betOn: "player1" | "player2";
  timestamp: string | number;
}

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

export const useVoting = () => {
  const [votes, setVotes] = useState<VoteData>({ player1Votes: 0, player2Votes: 0 });
  const [bets, setBets] = useState<BetData>({ player1Bets: 0, player2Bets: 0 });

  const [hasVoted, setHasVoted] = useState<"player1" | "player2" | null>(null);
  const [hasBet, setHasBet] = useState<"player1" | "player2" | null>(null);

  const [voterName, setVoterName] = useState<string>("");
  const [userVotes, setUserVotes] = useState<UserVote[]>([]);
  const [userBets, setUserBets] = useState<UserBet[]>([]);

  useEffect(() => {
    // purge legacy keys once
    ["bgmi-votes","bgmi-bets","bgmi-user-vote","bgmi-user-bet","bgmi-user-votes","bgmi-user-bets"]
      .forEach(k => localStorage.removeItem(k));

    const savedVoterName = localStorage.getItem("voter-name") || "";
    if (savedVoterName) setVoterName(savedVoterName);
    refreshTotalsAndFeeds();
  }, []);

  useEffect(() => {
    if (!voterName) {
      setHasVoted(null);
      setHasBet(null);
      return;
    }
    fetch(`${API_BASE}/users/${encodeURIComponent(voterName)}`)
      .then(r => r.json())
      .then(d => {
        setHasVoted(d.hasVoted ?? null);
        setHasBet(d.hasBet ?? null);
      })
      .catch(() => void 0);
  }, [voterName]);

  const refreshTotalsAndFeeds = async () => {
    try {
      const [vt, bt, vfeed, bfeed] = await Promise.all([
        fetch(`${API_BASE}/votes/totals`).then(r => r.json()),
        fetch(`${API_BASE}/bets/totals`).then(r => r.json()),
        fetch(`${API_BASE}/votes/recent?limit=200`).then(r => r.json()),
        fetch(`${API_BASE}/bets/recent?limit=200`).then(r => r.json()),
      ]);
      setVotes(vt);
      setBets(bt);
      setUserVotes(vfeed);
      setUserBets(bfeed);
    } catch {/* noop */}
  };

  const setVoterNameAndSave = (name: string) => {
    const n = name.trim();
    setVoterName(n);
    localStorage.setItem("bgmi-voter-name", n);
  };

  const vote = async (player: "player1" | "player2") => {
    if (hasVoted || !voterName) return;
    const res = await fetch(`${API_BASE}/votes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ voterName, votedFor: player }),
    });
    if (res.ok) {
      const data = await res.json();
      setVotes(data.totals);
      setHasVoted(player);
      await refreshTotalsAndFeeds();
    }
  };

  const placeBet = async (player: "player1" | "player2", amount: number) => {
    if (hasBet || !voterName || amount <= 0) return;
    const res = await fetch(`${API_BASE}/bets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ betterName: voterName, betOn: player, amount }),
    });
    if (res.ok) {
      const data = await res.json();
      setBets(data.totals);
      setHasBet(player);
      await refreshTotalsAndFeeds();
    }
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
