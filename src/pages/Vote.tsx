import { useVoting } from '@/hooks/useVoting';
import PlayerCard from '@/components/PlayerCard';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import player1Avatar from '@/assets/WhatsApp Image 2025-09-08 at 15.03.01_a69b9162.jpg';
import player2Avatar from '@/assets/WhatsApp Image 2025-09-08 at 15.03.01_6f972a29.jpg';

const Vote = () => {
  const { votes, bets, hasVoted, hasBet, voterName, vote, placeBet, setVoterNameAndSave, getPercentage, getBettingPercentage } = useVoting();
  const [tempName, setTempName] = useState('');
  const [betAmount, setBetAmount] = useState('');

  const handleNameSubmit = () => {
    if (!tempName.trim()) {
      toast({
        title: "Name Required!",
        description: "Please enter your name to continue.",
        variant: "destructive",
      });
      return;
    }
    setVoterNameAndSave(tempName.trim());
    toast({
      title: "Welcome!",
      description: `Hello ${tempName.trim()}, you can now cast your vote.`,
    });
  };

  const handleVote = (player: 'player1' | 'player2') => {
    if (hasVoted) {
      toast({
        title: "Already Voted!",
        description: "You have already cast your vote in this battle.",
        variant: "destructive",
      });
      return;
    }

    vote(player);
    toast({
      title: "Vote Recorded!",
      description: `Your vote for ${player === 'player1' ? 'Player Alpha' : 'Player Beta'} has been counted.`,
    });
  };

  const handleBet = (player: 'player1' | 'player2') => {
    const amount = parseInt(betAmount);
    
    if (hasBet) {
      toast({
        title: "Already Bet!",
        description: "You have already placed your bet in this battle.",
        variant: "destructive",
      });
      return;
    }

    if (!amount || amount <= 0) {
      toast({
        title: "Invalid Amount!",
        description: "Please enter a valid bet amount.",
        variant: "destructive",
      });
      return;
    }

    placeBet(player, amount);
    toast({
      title: "Bet Placed!",
      description: `Your bet of ${amount} for ${player === 'player1' ? 'Player Alpha' : 'Player Beta'} has been recorded.`,
    });
    setBetAmount('');
  };

  const player1Percentage = getPercentage(votes.player1Votes);
  const player2Percentage = getPercentage(votes.player2Votes);
  const player1BetPercentage = getBettingPercentage(bets.player1Bets);
  const player2BetPercentage = getBettingPercentage(bets.player2Bets);

  // If no voter name is set, show name input form
  if (!voterName) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="gaming-card p-8 text-center space-y-6">
              <h1 className="font-orbitron font-black text-3xl">
                <span className="glow-text-green">IDENTIFY</span>{' '}
                <span className="glow-text-orange">YOURSELF</span>
              </h1>
              <p className="text-muted-foreground font-rajdhani text-lg">
                Enter your name to cast your vote in this epic BGMI battle
              </p>
              
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Your name..."
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
                  className="text-center font-rajdhani text-lg"
                />
                <Button
                  onClick={handleNameSubmit}
                  className="w-full gaming-button-green font-orbitron font-bold py-3"
                  size="lg"
                >
                  ENTER BATTLE
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="font-orbitron font-black text-4xl md:text-6xl">
            <span className="glow-text-green">CHOOSE</span>{' '}
            <span className="glow-text-orange">YOUR</span>{' '}
            <span className="text-foreground">CHAMPION</span>
          </h1>
          <p className="text-xl text-muted-foreground font-rajdhani">
            satta lagao paisa kamao🤑🤑
          </p>
          <div className="space-y-2">
            <div className="inline-block bg-primary/20 text-primary px-4 py-2 rounded-lg border border-primary/30">
              👤 Voting as: <strong>{voterName}</strong>
            </div>
            {hasVoted && (
              <div className="block bg-green-500/20 text-green-400 px-4 py-2 rounded-lg border border-green-500/30">
                ✓ You voted for {hasVoted === 'player1' ? 'Player Alpha' : 'Player Beta'}
              </div>
            )}
            {hasBet && (
              <div className="block bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg border border-blue-500/30">
                💰 You bet on {hasBet === 'player1' ? 'Player Alpha' : 'Player Beta'}
              </div>
            )}
          </div>
        </div>

        {/* Betting Section */}
        {!hasBet && (
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="gaming-card p-6">
              <h3 className="font-orbitron font-bold text-xl mb-4 text-center">
                <span className="glow-text-purple">PLACE YOUR BET</span>
              </h3>
              <p className="text-center text-muted-foreground mb-6 font-rajdhani">
                Show your confidence! Bet on your favorite bell
              </p>
              
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Input
                    type="number"
                    placeholder="Enter bet amount..."
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    className="max-w-xs text-center font-rajdhani text-lg"
                    min="1"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={() => handleBet('player1')}
                    disabled={!betAmount || parseInt(betAmount) <= 0}
                    className="gaming-button-green font-orbitron font-bold py-3"
                    size="lg"
                  >
                    💰 BET ON Dhol
                  </Button>
                  <Button
                    onClick={() => handleBet('player2')}
                    disabled={!betAmount || parseInt(betAmount) <= 0}
                    className="gaming-button-orange font-orbitron font-bold py-3"
                    size="lg"
                  >
                    💰 BET ON Yeti
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Voting Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <PlayerCard
            name="Player Dhol"
            image={player1Avatar}
            votes={votes.player1Votes}
            percentage={player1Percentage}
            onVote={() => handleVote('player1')}
            hasVoted={!!hasVoted}
            isWinner={player1Percentage > player2Percentage && votes.player1Votes > 0}
            variant="green"
          />
          
          <PlayerCard
            name="Player Yeti"
            image={player2Avatar}
            votes={votes.player2Votes}
            percentage={player2Percentage}
            onVote={() => handleVote('player2')}
            hasVoted={!!hasVoted}
            isWinner={player2Percentage > player1Percentage && votes.player2Votes > 0}
            variant="orange"
          />
        </div>

        {/* Battle Stats */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="gaming-card p-6">
            <h3 className="font-orbitron font-bold text-xl mb-6 text-center">Battle Statistics</h3>
            
            <div className="space-y-6">
              {/* Voting Stats */}
              <div className="space-y-4">
                <h4 className="font-rajdhani font-semibold text-lg text-center glow-text-green">🗳️ VOTING RESULTS</h4>
                <div className="flex justify-between items-center">
                  <span className="font-rajdhani font-semibold">Total Votes</span>
                  <span className="font-orbitron font-bold">{votes.player1Votes + votes.player2Votes}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="glow-text-green">Dhol</span>
                    <span>{player1Percentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="progress-bar-green h-3 rounded-full transition-all duration-700"
                      style={{ width: `${player1Percentage}%` }}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="glow-text-orange">Yeti</span>
                    <span>{player2Percentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="progress-bar-orange h-3 rounded-full transition-all duration-700"
                      style={{ width: `${player2Percentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Betting Stats */}
              <div className="space-y-4 border-t border-muted pt-4">
                <h4 className="font-rajdhani font-semibold text-lg text-center glow-text-purple">💰 BETTING RESULTS</h4>
                <div className="flex justify-between items-center">
                  <span className="font-rajdhani font-semibold">Total Bets</span>
                  <span className="font-orbitron font-bold">{bets.player1Bets + bets.player2Bets}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="glow-text-green">Dhol pr etna laga </span>
                    <span>{player1BetPercentage}% ({bets.player1Bets})</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="progress-bar-purple h-3 rounded-full transition-all duration-700"
                      style={{ width: `${player1BetPercentage}%` }}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="glow-text-orange">Yeti pr etna laga </span>
                    <span>{player2BetPercentage}% ({bets.player2Bets})</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="progress-bar-purple h-3 rounded-full transition-all duration-700"
                      style={{ width: `${player2BetPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vote;