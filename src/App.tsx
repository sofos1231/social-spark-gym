import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, BarChart3, ShoppingBag, User } from 'lucide-react-native';
import PracticeHub from '@/pages/PracticeHub';
import Stats from '@/pages/Stats';
import Shop from '@/pages/Shop';
import Profile from '@/pages/Profile';
import TopStatusBar from '@/components/TopStatusBar';
import { colors } from '@/styles/themes';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="light" backgroundColor={colors.background} />
        <NavigationContainer
          theme={{
            dark: true,
            colors: {
              primary: colors.primary,
              background: colors.background,
              card: colors.card,
              text: colors.foreground,
              border: colors.border,
              notification: colors.primary,
            },
          }}
        >
          {/* Top Status Bar */}
          <TopStatusBar />
          
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarStyle: {
                backgroundColor: colors.card,
                borderTopColor: colors.border,
                borderTopWidth: 1,
                height: 80,
                paddingBottom: 20,
                paddingTop: 10,
              },
              tabBarActiveTintColor: colors.primary,
              tabBarInactiveTintColor: colors.mutedForeground,
              tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: '600',
              },
              tabBarIcon: ({ focused, color, size }) => {
                let IconComponent;

                if (route.name === 'PracticeHub') {
                  IconComponent = Home;
                } else if (route.name === 'Stats') {
                  IconComponent = BarChart3;
                } else if (route.name === 'Shop') {
                  IconComponent = ShoppingBag;
                } else if (route.name === 'Profile') {
                  IconComponent = User;
                }

                return IconComponent ? <IconComponent color={color} size={size} /> : null;
              },
            })}
          >
            <Tab.Screen 
              name="PracticeHub" 
              component={PracticeHub}
              options={{ title: 'Practice' }}
            />
            <Tab.Screen 
              name="Stats" 
              component={Stats}
              options={{ title: 'Stats' }}
            />
            <Tab.Screen 
              name="Shop" 
              component={Shop}
              options={{ title: 'Shop' }}
            />
            <Tab.Screen 
              name="Profile" 
              component={Profile}
              options={{ title: 'Profile' }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
