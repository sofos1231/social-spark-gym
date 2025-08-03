import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, BarChart3, ShoppingBag, User } from 'lucide-react';

// Import the new React Native-inspired components
import PracticeScreen from './screens/PracticeScreen';
import StatsScreen from './screens/StatsScreen';
import ShopScreen from './screens/ShopScreen';
import ProfileScreen from './screens/ProfileScreen';

// React Native-inspired Bottom Navigation
const BottomNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Practice' },
    { path: '/stats', icon: BarChart3, label: 'Stats' },
    { path: '/shop', icon: ShoppingBag, label: 'Shop' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 rn-nav flex justify-around items-center px-4 z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const IconComponent = item.icon;
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className="flex flex-col items-center justify-center flex-1 py-2"
          >
            <IconComponent 
              size={24} 
              color={isActive ? '#8B5CF6' : '#B6B6B6'} 
            />
            <span 
              className={`text-xs font-semibold mt-1 ${
                isActive ? 'text-[#8B5CF6]' : 'text-[#B6B6B6]'
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

function AppContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0F1A] to-[#141519] text-white">
      <Routes>
        <Route path="/" element={<PracticeScreen />} />
        <Route path="/stats" element={<StatsScreen />} />
        <Route path="/shop" element={<ShopScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Routes>
      <BottomNavigation />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;