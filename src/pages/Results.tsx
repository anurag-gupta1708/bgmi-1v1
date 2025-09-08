import { useVoting } from '@/hooks/useVoting';
import { Trophy, TrendingUp, Users, Target } from 'lucide-react';
import player1Avatar from '@/assets/WhatsApp Image 2025-09-08 at 15.03.01_a69b9162.jpg';
import player2Avatar from '@/assets/WhatsApp Image 2025-09-08 at 15.03.01_6f972a29.jpg';

const Results = () => {
  const { votes, bets, getTotalVotes, getTotalBets, getPercentage, getBettingPercentage } = useVoting();
  
  const totalVotes = getTotalVotes();
  const totalBets = getTotalBets();
  const player1Percentage = getPercentage(votes.player1Votes);
  const player2Percentage = getPercentage(votes.player2Votes);
  const player1BetPercentage = getBettingPercentage(bets.player1Bets);
  const player2BetPercentage = getBettingPercentage(bets.player2Bets);
  
  const isPlayer1Winning = votes.player1Votes > votes.player2Votes;
  const isPlayer1WinningBets = bets.player1Bets > bets.player2Bets;
  const isTied = votes.player1Votes === votes.player2Votes;
  const isBetsTied = bets.player1Bets === bets.player2Bets;

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
            aapne jo satta lagya hai uske liye dhanyvad
            vote ki MC usse kisi ko ganta fark nhi parta 
            main vote chori kr lunga😂😂
          </p>
        </div>

        {/* Winner Announcement */}
        {totalVotes > 0 && (
          <div className="mb-8">
            <div className="gaming-card p-8 text-center max-w-2xl mx-auto">
              <div className="flex justify-center mb-4">
                <Trophy className="w-16 h-16 text-primary" />
              </div>
              <h2 className="font-orbitron font-bold text-2xl mb-2">
                {isTied ? 'IT\'S A TIE!' : `${isPlayer1Winning ? 'PLAYER ALPHA' : 'PLAYER BETA'} LEADS VOTES!`}
              </h2>
              <p className="text-muted-foreground font-rajdhani">
                {isTied 
                  ? 'Both players are neck and neck in voting!'
                  : `Currently dominating with ${Math.max(player1Percentage, player2Percentage)}% of votes`
                }
              </p>
            </div>
          </div>
        )}

        {/* Betting Winner Announcement */}
        {totalBets > 0 && (
          <div className="mb-12">
            <div className="gaming-card p-6 text-center max-w-2xl mx-auto border-purple-500/30">
              <div className="flex justify-center mb-4">
                <div className="text-4xl">💰</div>
              </div>
              <h2 className="font-orbitron font-bold text-xl mb-2 glow-text-purple">
                {isBetsTied ? 'BETTING IS TIED!' : `${isPlayer1WinningBets ? 'PLAYER ALPHA' : 'PLAYER BETA'} LEADS BETS!`}
              </h2>
              <p className="text-muted-foreground font-rajdhani">
                {isBetsTied 
                  ? 'Equal confidence in both players!'
                  : `Attracting ${Math.max(player1BetPercentage, player2BetPercentage)}% of total bets (${Math.max(bets.player1Bets, bets.player2Bets)} total)`
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
                  alt="Deepak" 
                  className="w-16 h-16 rounded-full border-2 border-primary"
                />
                {isPlayer1Winning && !isTied && (
                  <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs">
                    👑
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-orbitron font-bold text-xl glow-text-green">Deepak</h3>
                <p className="text-muted-foreground text-sm">boobies vala</p>
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
                  <span>Vote %</span>
                  <span className="font-bold">{player1Percentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-4">
                  <div
                    className="progress-bar-green h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${player1Percentage}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-rajdhani font-semibold">Bets</span>
                <span className="font-orbitron font-bold text-xl text-purple-400">
                  {bets.player1Bets}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Bet %</span>
                  <span className="font-bold">{player1BetPercentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-4">
                  <div
                    className="progress-bar-purple h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${player1BetPercentage}%` }}
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
                  alt="Eshank" 
                  className="w-16 h-16 rounded-full border-2 border-secondary"
                />
                {!isPlayer1Winning && !isTied && (
                  <div className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs">
                    👑
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-orbitron font-bold text-xl glow-text-orange">Eshank</h3>
                <p className="text-muted-foreground text-sm">chuche vala</p>
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
                  <span>Vote %</span>
                  <span className="font-bold">{player2Percentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-4">
                  <div
                    className="progress-bar-orange h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${player2Percentage}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-rajdhani font-semibold">Bets</span>
                <span className="font-orbitron font-bold text-xl text-purple-400">
                  {bets.player2Bets}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Bet %</span>
                  <span className="font-bold">{player2BetPercentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-4">
                  <div
                    className="progress-bar-purple h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${player2BetPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overall Statistics */}
        <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="gaming-card p-6 text-center">
            <Users className="w-8 h-8 mx-auto mb-3 text-primary" />
            <div className="font-orbitron font-bold text-2xl mb-1">{totalVotes}</div>
            <div className="text-muted-foreground text-sm">Total Votes</div>
          </div>

          <div className="gaming-card p-6 text-center">
            <div className="text-3xl mb-3">💰</div>
            <div className="font-orbitron font-bold text-2xl mb-1">{totalBets}</div>
            <div className="text-muted-foreground text-sm">Total Bets</div>
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

        {(totalVotes === 0 && totalBets === 0) && (
          <div className="text-center mt-8">
            <div className="gaming-card p-8 max-w-md mx-auto">
              <Target className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-orbitron font-bold text-xl mb-2">No Votes Yet</h3>
              <p className="text-muted-foreground mb-4">
                Be the first to cast your vote in this epic battle!
              </p>
              <a href="/vote" className="gaming-button-green inline-block">
                START VOTING & BETTING
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;