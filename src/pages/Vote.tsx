import { useVoting } from '@/hooks/useVoting';
import PlayerCard from '@/components/PlayerCard';
import { toast } from '@/hooks/use-toast';
import player1Avatar from '@/assets/player1-avatar.jpg';
import player2Avatar from '@/assets/player2-avatar.jpg';

const Vote = () => {
  const { votes, hasVoted, vote, getPercentage } = useVoting();

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

  const player1Percentage = getPercentage(votes.player1Votes);
  const player2Percentage = getPercentage(votes.player2Votes);

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
            Cast your vote for the ultimate BGMI champion
          </p>
          {hasVoted && (
            <div className="inline-block bg-primary/20 text-primary px-4 py-2 rounded-lg border border-primary/30">
              ✓ You voted for {hasVoted === 'player1' ? 'Player Alpha' : 'Player Beta'}
            </div>
          )}
        </div>

        {/* Voting Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <PlayerCard
            name="Player Alpha"
            image={player1Avatar}
            votes={votes.player1Votes}
            percentage={player1Percentage}
            onVote={() => handleVote('player1')}
            hasVoted={!!hasVoted}
            isWinner={player1Percentage > player2Percentage && votes.player1Votes > 0}
            variant="green"
          />
          
          <PlayerCard
            name="Player Beta"
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
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-rajdhani font-semibold">Total Votes</span>
                <span className="font-orbitron font-bold">{votes.player1Votes + votes.player2Votes}</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="glow-text-green">Player Alpha</span>
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
                  <span className="glow-text-orange">Player Beta</span>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vote;