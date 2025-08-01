import { useState } from 'react';
import { Coins, Gem, Zap, RotateCcw, Unlock, Crown, Star, Gift, Sparkles } from 'lucide-react';

const Shop = () => {
  const [currency] = useState({
    coins: 1250,
    diamonds: 8
  });

  const powerUps = [
    {
      id: 'xp-boost',
      icon: Zap,
      title: '2x XP Boost',
      description: '24 hours of double XP gains',
      cost: 50,
      currency: 'coins' as const,
      rarity: 'common',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      id: 'confidence-booster',
      icon: Star,
      title: 'Confidence Booster',
      description: '+15% confidence score for next session',
      cost: 75,
      currency: 'coins' as const,
      rarity: 'uncommon',
      gradient: 'from-blue-400 to-indigo-500'
    },
    {
      id: 'retry-token',
      icon: RotateCcw,
      title: 'Retry Token',
      description: 'Retry any failed practice drill',
      cost: 30,
      currency: 'coins' as const,
      rarity: 'common',
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      id: 'instant-unlock',
      icon: Unlock,
      title: 'Instant Unlock',
      description: 'Unlock next skill node immediately',
      cost: 2,
      currency: 'diamonds' as const,
      rarity: 'rare',
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      id: 'premium-drill',
      icon: Crown,
      title: 'Premium Scenarios',
      description: '10 exclusive practice scenarios',
      cost: 3,
      currency: 'diamonds' as const,
      rarity: 'epic',
      gradient: 'from-orange-400 to-red-500'
    },
    {
      id: 'ai-coach-boost',
      icon: Sparkles,
      title: 'AI Coach Boost',
      description: 'Enhanced feedback for 7 days',
      cost: 5,
      currency: 'diamonds' as const,
      rarity: 'legendary',
      gradient: 'from-pink-400 to-rose-500'
    }
  ];

  const coinPacks = [
    { amount: 100, price: 4.99, bonus: null, popular: false },
    { amount: 300, price: 9.99, bonus: "+50 Bonus", popular: true },
    { amount: 750, price: 19.99, bonus: "+150 Bonus", popular: false },
    { amount: 1500, price: 34.99, bonus: "+400 Bonus", popular: false }
  ];

  const diamondPacks = [
    { amount: 5, price: 2.99, bonus: null, popular: false },
    { amount: 15, price: 7.99, bonus: "+3 Bonus", popular: true },
    { amount: 40, price: 14.99, bonus: "+10 Bonus", popular: false },
    { amount: 100, price: 24.99, bonus: "+25 Bonus", popular: false }
  ];

  const getRarityStyle = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 shadow-gray-500/20';
      case 'uncommon': return 'border-green-300 shadow-green-500/20';
      case 'rare': return 'border-blue-300 shadow-blue-500/20';
      case 'epic': return 'border-purple-300 shadow-purple-500/20';
      case 'legendary': return 'border-yellow-300 shadow-yellow-500/20';
      default: return 'border-gray-300 shadow-gray-500/20';
    }
  };

  const canAfford = (item: typeof powerUps[0]) => {
    return item.currency === 'coins' 
      ? currency.coins >= item.cost 
      : currency.diamonds >= item.cost;
  };

  return (
    <div 
      className="min-h-screen pb-20 pt-24"
      style={{ 
        background: 'linear-gradient(135deg, #0f1323 0%, #1a1a2e 50%, #16213e 100%)' 
      }}
    >
      {/* Header */}
      <div className="section-mobile">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-bold mb-3 text-gradient-intense">
            Power Shop
          </h1>
          <p className="text-lg text-muted-foreground font-display font-medium">
            Boost your social training
          </p>
        </div>
      </div>

      {/* Currency Balance */}
      <div className="px-4 mb-6">
        <div className="card-warm p-6 animate-scale-in">
          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-xl">
                <Coins size={24} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{currency.coins.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Coins</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-xl">
                <Gem size={24} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{currency.diamonds}</div>
                <div className="text-sm text-muted-foreground">Diamonds</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Power-ups Grid */}
      <div className="px-4 mb-8">
        <h2 className="text-2xl font-display font-bold mb-4 text-foreground flex items-center gap-2">
          <Zap size={24} className="text-warning" />
          Power-ups
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          {powerUps.map((powerUp, index) => {
            const Icon = powerUp.icon;
            const affordable = canAfford(powerUp);
            
            return (
              <div
                key={powerUp.id}
                className={`
                  card-warm p-4 text-center transition-all duration-300 animate-scale-in relative overflow-hidden
                  ${affordable 
                    ? 'hover:scale-105 hover:shadow-2xl cursor-pointer' 
                    : 'opacity-60 cursor-not-allowed'
                  }
                  ${getRarityStyle(powerUp.rarity)}
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Rarity glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${powerUp.gradient} opacity-10 rounded-xl`} />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br ${powerUp.gradient} flex items-center justify-center shadow-lg`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  
                  <h3 className="font-bold text-sm mb-2 text-foreground">{powerUp.title}</h3>
                  <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                    {powerUp.description}
                  </p>
                  
                  <div className="flex items-center justify-center gap-2">
                    {powerUp.currency === 'coins' ? (
                      <Coins size={16} className="text-yellow-500" />
                    ) : (
                      <Gem size={16} className="text-blue-500" />
                    )}
                    <span className="text-sm font-bold text-foreground">{powerUp.cost}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Coin Packs */}
      <div className="px-4 mb-8">
        <h2 className="text-2xl font-display font-bold mb-4 text-foreground flex items-center gap-2">
          <Coins size={24} className="text-yellow-500" />
          Coin Packs
        </h2>
        
        <div className="space-y-4">
          {coinPacks.map((pack, index) => (
            <div
              key={index}
              className={`
                card-warm p-4 flex items-center justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer animate-slide-up relative overflow-hidden
                ${pack.popular ? 'border-2 border-yellow-400 shadow-yellow-400/25' : ''}
              `}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {pack.popular && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  POPULAR
                </div>
              )}
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                  <Coins size={24} className="text-white" />
                </div>
                <div>
                  <div className="font-bold text-lg text-foreground">{pack.amount.toLocaleString()} Coins</div>
                  {pack.bonus && (
                    <div className="text-sm text-green-500 font-medium">{pack.bonus}</div>
                  )}
                </div>
              </div>
              
              <div className="bg-gradient-primary text-white px-6 py-2 rounded-xl font-bold shadow-lg">
                ${pack.price}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Diamond Packs */}
      <div className="px-4 mb-8">
        <h2 className="text-2xl font-display font-bold mb-4 text-foreground flex items-center gap-2">
          <Gem size={24} className="text-blue-500" />
          Diamond Packs
        </h2>
        
        <div className="space-y-4">
          {diamondPacks.map((pack, index) => (
            <div
              key={index}
              className={`
                card-warm p-4 flex items-center justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer animate-slide-up relative overflow-hidden
                ${pack.popular ? 'border-2 border-blue-400 shadow-blue-400/25' : ''}
              `}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {pack.popular && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  BEST VALUE
                </div>
              )}
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-lg">
                  <Gem size={24} className="text-white" />
                </div>
                <div>
                  <div className="font-bold text-lg text-foreground">{pack.amount} Diamonds</div>
                  {pack.bonus && (
                    <div className="text-sm text-green-500 font-medium">{pack.bonus}</div>
                  )}
                </div>
              </div>
              
              <div className="bg-gradient-accent text-white px-6 py-2 rounded-xl font-bold shadow-lg">
                ${pack.price}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Tip */}
      <div className="px-4 py-8">
        <div className="card-warm p-6 text-center animate-scale-in" style={{animationDelay: '500ms'}}>
          <div className="text-4xl mb-3">💡</div>
          <h3 className="text-lg font-display font-bold text-gradient-xp mb-2">
            Earn coins daily!
          </h3>
          <p className="text-sm text-muted-foreground">
            Complete practice sessions and maintain streaks to earn free coins every day
          </p>
        </div>
      </div>
    </div>
  );
};

export default Shop;