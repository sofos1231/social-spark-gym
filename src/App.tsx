import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Home, BarChart3, ShoppingBag, User } from 'lucide-react';
import PracticeHub from '@/pages/PracticeHub';
import Stats from '@/pages/Stats';
import Shop from '@/pages/Shop';
import Profile from '@/pages/Profile';
import TopStatusBar from '@/components/TopStatusBar';

// React Native-style navigation component for web
const BottomNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Practice' },
    { path: '/stats', icon: BarChart3, label: 'Stats' },
    { path: '/shop', icon: ShoppingBag, label: 'Shop' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: 80,
      backgroundColor: '#1C2137',
      borderTopColor: '#334155',
      borderTopWidth: 1,
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingTop: 10,
      paddingBottom: 20,
      zIndex: 50,
    }}>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const IconComponent = item.icon;
        
        return (
          <a
            key={item.path}
            href={item.path}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              color: isActive ? '#8B5CF6' : '#B6B6B6',
              fontSize: 12,
              fontWeight: '600',
            }}
          >
            <IconComponent size={24} />
            <span style={{ marginTop: 4 }}>{item.label}</span>
          </a>
        );
      })}
    </div>
  );
};

function AppContent() {
  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0D0F1A 0%, #141519 100%)',
      color: '#FFFFFF',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <TopStatusBar />
      
      <Routes>
        <Route path="/" element={<PracticeHub />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/profile" element={<Profile />} />
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
