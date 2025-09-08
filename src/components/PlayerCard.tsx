import { User } from 'lucide-react';

interface PlayerCardProps {
  name: string;
  image: string;
  votes: number;
  percentage: number;
  onVote: () => void;
  hasVoted: boolean;
  isWinner?: boolean;
  variant: 'green' | 'orange';
}

const PlayerCard = ({ 
  name, 
  image, 
  votes, 
  percentage, 
  onVote, 
  hasVoted, 
  isWinner,
  variant 
}: PlayerCardProps) => {
  const isGreen = variant === 'green';
  
  return (
    <div className={`gaming-card p-6 text-center space-y-4 ${isWinner ? 'ring-2 ring-primary' : ''}`}>
      <div className="relative">
        <div className={`w-32 h-32 mx-auto rounded-full overflow-hidden border-4 ${
          isGreen ? 'border-primary' : 'border-secondary'
        }`}>
          <img 
            src={image} 
            alt={`${name} avatar`} 
            className="w-full h-full object-cover"
          />
        </div>
        {isWinner && (
          <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center">
            👑
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className={`font-orbitron font-bold text-xl ${
          isGreen ? 'glow-text-green' : 'glow-text-orange'
        }`}>
          {name}
        </h3>
        
        <div className="space-y-1">
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>Votes: {votes}</span>
            <span>{percentage}%</span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                isGreen ? 'progress-bar-green' : 'progress-bar-orange'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
      
      <button
        onClick={onVote}
        disabled={hasVoted}
        className={`w-full font-orbitron font-bold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
          isGreen ? 'gaming-button-green' : 'gaming-button-orange'
        } ${hasVoted ? 'opacity-50' : ''}`}
      >
        {hasVoted ? 'VOTED' : 'VOTE'}
      </button>
    </div>
  );
};

export default PlayerCard;