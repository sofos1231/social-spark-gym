import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import PracticeHub from "./pages/PracticeHub";
import PracticeRoad from "./pages/PracticeRoad";
import QuickDrill from "./pages/QuickDrill";
import ShadowPractice from "./pages/ShadowPractice";
import Stats from "./pages/Stats";
import Profile from "./pages/Profile";
import Upgrade from "./pages/Upgrade";
import Shop from "./pages/Shop";
import Badges from "./pages/Badges";
import LevelMilestones from "./pages/LevelMilestones";
import Navigation from "./components/Navigation";
import TopStatusBar from "./components/TopStatusBar";

const queryClient = new QueryClient();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <>
      <TopStatusBar />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' } // Hide default tab bar, we'll use custom Navigation
        }}
      >
        <Tab.Screen name="PracticeHub" component={PracticeHub} />
        <Tab.Screen name="QuickDrill" component={QuickDrill} />
        <Tab.Screen name="Stats" component={Stats} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Shop" component={Shop} />
      </Tab.Navigator>
      <Navigation />
    </>
  );
}

const App = () => (
  <SafeAreaProvider>
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="PracticeRoad" component={PracticeRoad} />
          <Stack.Screen name="ShadowPractice" component={ShadowPractice} />
          <Stack.Screen name="Upgrade" component={Upgrade} />
          <Stack.Screen name="Badges" component={Badges} />
          <Stack.Screen name="LevelMilestones" component={LevelMilestones} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  </SafeAreaProvider>
);

export default App;
