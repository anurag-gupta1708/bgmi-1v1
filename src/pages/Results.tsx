import { useVoting } from '@/hooks/useVoting';
import { Trophy, TrendingUp, Users, Target } from 'lucide-react';
import player1Avatar from '@/assets/player1-avatar.jpg';
import player2Avatar from '@/assets/player2-avatar.jpg';

const Results = () => {
  const { votes, getTotalVotes, getPercentage } = useVoting();
  
  const totalVotes = getTotalVotes();
  const player1Percentage = getPercentage(votes.player1Votes);
  const player2Percentage = getPercentage(votes.player2Votes);
  
  const isPlayer1Winning = votes.player1Votes > votes.player2Votes;
  const isTied = votes.player1Votes === votes.player2Votes;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="font-orbitron font-black text-4xl md:text-6xl">
            <span className="glow-text-green">LIVE</span>{' '}
            <span className="glow-text-orange">RESULTS</span>
          </h1>
          <p className="text-xl text-muted-foreground font-rajdhani">
            Real-time battle statistics and leaderboard
          </p>
        </div>

        {/* Winner Announcement */}
        {totalVotes > 0 && (
          <div className="mb-12">
            <div className="gaming-card p-8 text-center max-w-2xl mx-auto">
              <div className="flex justify-center mb-4">
                <Trophy className="w-16 h-16 text-primary" />
              </div>
              <h2 className="font-orbitron font-bold text-2xl mb-2">
                {isTied ? 'IT\'S A TIE!' : `${isPlayer1Winning ? 'PLAYER ALPHA' : 'PLAYER BETA'} LEADS!`}
              </h2>
              <p className="text-muted-foreground font-rajdhani">
                {isTied 
                  ? 'Both players are neck and neck in this epic battle!'
                  : `Currently dominating with ${Math.max(player1Percentage, player2Percentage)}% of votes`
                }
              </p>
            </div>
          </div>
        )}

        {/* Leaderboard */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {/* Player Alpha */}
          <div className={`gaming-card p-6 ${isPlayer1Winning && !isTied ? 'ring-2 ring-primary' : ''}`}>
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative">
                <img 
                  src={player1Avatar} 
                  alt="Player Alpha" 
                  className="w-16 h-16 rounded-full border-2 border-primary"
                />
                {isPlayer1Winning && !isTied && (
                  <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs">
                    👑
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-orbitron font-bold text-xl glow-text-green">Player Alpha</h3>
                <p className="text-muted-foreground text-sm">Strategic Mastermind</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-rajdhani font-semibold">Votes</span>
                <span className="font-orbitron font-bold text-2xl glow-text-green">
                  {votes.player1Votes}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Percentage</span>
                  <span className="font-bold">{player1Percentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-4">
                  <div
                    className="progress-bar-green h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${player1Percentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Player Beta */}
          <div className={`gaming-card p-6 ${!isPlayer1Winning && !isTied ? 'ring-2 ring-secondary' : ''}`}>
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative">
                <img 
                  src={player2Avatar} 
                  alt="Player Beta" 
                  className="w-16 h-16 rounded-full border-2 border-secondary"
                />
                {!isPlayer1Winning && !isTied && (
                  <div className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs">
                    👑
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-orbitron font-bold text-xl glow-text-orange">Player Beta</h3>
                <p className="text-muted-foreground text-sm">Lightning Fighter</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-rajdhani font-semibold">Votes</span>
                <span className="font-orbitron font-bold text-2xl glow-text-orange">
                  {votes.player2Votes}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Percentage</span>
                  <span className="font-bold">{player2Percentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-4">
                  <div
                    className="progress-bar-orange h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${player2Percentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overall Statistics */}
        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="gaming-card p-6 text-center">
            <Users className="w-8 h-8 mx-auto mb-3 text-primary" />
            <div className="font-orbitron font-bold text-2xl mb-1">{totalVotes}</div>
            <div className="text-muted-foreground text-sm">Total Votes</div>
          </div>
          
          <div className="gaming-card p-6 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-3 text-secondary" />
            <div className="font-orbitron font-bold text-2xl mb-1">
              {Math.abs(votes.player1Votes - votes.player2Votes)}
            </div>
            <div className="text-muted-foreground text-sm">Vote Difference</div>
          </div>
          
          <div className="gaming-card p-6 text-center">
            <Target className="w-8 h-8 mx-auto mb-3 text-primary" />
            <div className="font-orbitron font-bold text-2xl mb-1">LIVE</div>
            <div className="text-muted-foreground text-sm">Real-time Updates</div>
          </div>
        </div>

        {totalVotes === 0 && (
          <div className="text-center mt-8">
            <div className="gaming-card p-8 max-w-md mx-auto">
              <Target className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-orbitron font-bold text-xl mb-2">No Votes Yet</h3>
              <p className="text-muted-foreground mb-4">
                Be the first to cast your vote in this epic battle!
              </p>
              <a href="/vote" className="gaming-button-green inline-block">
                START VOTING
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;