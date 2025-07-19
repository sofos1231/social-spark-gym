import { useState } from 'react';
import { Coins, Gem, Zap, RotateCcw, Unlock, Crown } from 'lucide-react';

const Shop = () => {
  const [currency] = useState({
    coins: 150,
    diamonds: 5
  });

  const coinPacks = [
    { amount: 100, price: 4.99, bonus: null },
    { amount: 250, price: 9.99, bonus: "+50 Bonus" },
    { amount: 500, price: 19.99, bonus: "+100 Bonus" },
    { amount: 1000, price: 34.99, bonus: "+300 Bonus" }
  ];

  const diamondPacks = [
    { amount: 5, price: 2.99, bonus: null },
    { amount: 15, price: 7.99, bonus: "+5 Bonus" },
    { amount: 30, price: 14.99, bonus: "+10 Bonus" },
    { amount: 60, price: 24.99, bonus: "+20 Bonus" }
  ];

  const powerUps = [
    {
      id: 'xp-boost',
      icon: Zap,
      title: '2x XP Boost',
      description: '24 hours of double XP',
      cost: 50,
      currency: 'coins' as const,
      color: 'text-warning'
    },
    {
      id: 'retry-token',
      icon: RotateCcw,
      title: 'Retry Token',
      description: 'Retry any failed drill',
      cost: 25,
      currency: 'coins' as const,
      color: 'text-primary'
    },
    {
      id: 'instant-unlock',
      icon: Unlock,
      title: 'Instant Unlock',
      description: 'Unlock next skill immediately',
      cost: 2,
      currency: 'diamonds' as const,
      color: 'text-accent'
    },
    {
      id: 'premium-drill',
      icon: Crown,
      title: 'Premium Drill Pack',
      description: '10 exclusive practice scenarios',
      cost: 3,
      currency: 'diamonds' as const,
      color: 'text-success'
    }
  ];

  const renderCurrencyIcon = (currency: 'coins' | 'diamonds') => {
    return currency === 'coins' ? 
      <Coins size={16} className="text-xp-gold" /> : 
      <Gem size={16} className="text-xp-diamond" />;
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="section-mobile">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Shop</h1>
          <p className="text-muted-foreground">
            Power up your social training 💰
          </p>
        </div>

        {/* Currency Balance */}
        <div className="card-elevated p-4 mb-6">
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <Coins size={20} className="text-xp-gold" />
              <span className="font-semibold">{currency.coins.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Gem size={20} className="text-xp-diamond" />
              <span className="font-semibold">{currency.diamonds}</span>
            </div>
          </div>
        </div>

        {/* Power-ups */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Zap size={20} className="text-warning" />
            Power-ups
          </h2>
          
          <div className="grid grid-cols-2 gap-3">
            {powerUps.map((powerUp) => {
              const Icon = powerUp.icon;
              const canAfford = powerUp.currency === 'coins' 
                ? currency.coins >= powerUp.cost 
                : currency.diamonds >= powerUp.cost;
              
              return (
                <button
                  key={powerUp.id}
                  disabled={!canAfford}
                  className={`
                    card-elevated p-4 text-left transition-all duration-200
                    ${canAfford 
                      ? 'hover:scale-105 hover:shadow-glow cursor-pointer' 
                      : 'opacity-50 cursor-not-allowed'
                    }
                  `}
                >
                  <div className={`${powerUp.color} mb-2`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{powerUp.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    {powerUp.description}
                  </p>
                  <div className="flex items-center gap-1 justify-center">
                    {renderCurrencyIcon(powerUp.currency)}
                    <span className="text-sm font-medium">{powerUp.cost}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Coin Packs */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Coins size={20} className="text-xp-gold" />
            Coin Packs
          </h2>
          
          <div className="space-y-3">
            {coinPacks.map((pack, index) => (
              <button
                key={index}
                className="w-full card-elevated p-4 flex items-center justify-between hover:scale-[1.02] transition-all duration-200 hover:shadow-elevation"
              >
                <div className="flex items-center gap-3">
                  <Coins size={24} className="text-xp-gold" />
                  <div className="text-left">
                    <div className="font-semibold">{pack.amount.toLocaleString()} Coins</div>
                    {pack.bonus && (
                      <div className="text-xs text-success">{pack.bonus}</div>
                    )}
                  </div>
                </div>
                <div className="text-primary font-semibold">
                  ₪{pack.price}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Diamond Packs */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Gem size={20} className="text-xp-diamond" />
            Diamond Packs
          </h2>
          
          <div className="space-y-3">
            {diamondPacks.map((pack, index) => (
              <button
                key={index}
                className="w-full card-elevated p-4 flex items-center justify-between hover:scale-[1.02] transition-all duration-200 hover:shadow-elevation"
              >
                <div className="flex items-center gap-3">
                  <Gem size={24} className="text-xp-diamond" />
                  <div className="text-left">
                    <div className="font-semibold">{pack.amount} Diamonds</div>
                    {pack.bonus && (
                      <div className="text-xs text-success">{pack.bonus}</div>
                    )}
                  </div>
                </div>
                <div className="text-primary font-semibold">
                  ₪{pack.price}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="card-elevated p-4 text-center">
          <p className="text-sm text-muted-foreground">
            💡 Earn coins by completing drills and maintaining streaks!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Shop;