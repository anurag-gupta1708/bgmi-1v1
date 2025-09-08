import { Link } from 'react-router-dom';
import { Sword, Trophy, Users } from 'lucide-react';
import { useVoting } from '@/hooks/useVoting';

const Home = () => {
  const { getTotalVotes } = useVoting();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-16">
          <div className="space-y-4">
            <h1 className="font-orbitron font-black text-5xl md:text-7xl glow-text-green">
              BGMI VOTING
            </h1>
            <h2 className="font-orbitron font-black text-4xl md:text-6xl glow-text-orange">
              BATTLE
            </h2>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-rajdhani">
            DO Bello ke bech me ho rha h 1v1 
            aapko satta lagna hai kon jete ga 
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>{getTotalVotes()} total votes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="w-4 h-4" />
              <span>Live Results</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sword className="w-4 h-4" />
              <span>1v1 Battle</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-8">
          <div className="gaming-card p-8 max-w-md mx-auto">
            <h3 className="font-orbitron font-bold text-2xl mb-4">Ready to Vote?</h3>
            <p className="text-muted-foreground mb-6 font-rajdhani">
              Choose your champion and join the battle. Ye bss bolne ki baat hai dono sale dhol he hai
            </p>
            
            <div className="space-y-4">
              <Link 
                to="/vote" 
                className="block gaming-button-green text-center w-full"
              >
                START VOTING
              </Link>
              
              <Link 
                to="/results" 
                className="block gaming-button-orange text-center w-full"
              >
                VIEW RESULTS
              </Link>
            </div>
          </div>
        </div>

        {/* Battle Preview */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 items-center">
          <div className="gaming-card p-6 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-3xl">🥁</span>
            </div>
            <h4 className="font-orbitron font-bold text-lg mb-2">Dhol</h4>
            <p className="text-muted-foreground text-sm">
              Strategic mastermind with incredible aim
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-6xl mb-4">⚡</div>
            <h3 className="font-orbitron font-bold text-xl glow-text-green">VS</h3>
          </div>
          
          <div className="gaming-card p-6 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary/20 flex items-center justify-center">
              <span className="text-3xl">🐻‍❄️</span>
            </div>
            <h4 className="font-orbitron font-bold text-lg mb-2">Yeti</h4>
            <p className="text-muted-foreground text-sm">
              Aggressive fighter with lightning reflexes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;