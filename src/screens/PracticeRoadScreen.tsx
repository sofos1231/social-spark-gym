import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeft, Crown, Zap } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import PracticeStepCard from '../components/PracticeStepCard';
import ProgressBar from '../components/ProgressBar';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface StepData {
  id: string;
  title: string;
  icon: string;
  status: 'locked' | 'unlocked' | 'completed';
}

interface CategoryConfig {
  title: string;
  subtitle: string;
  theme: 'dating' | 'interview' | 'charisma' | 'speaking';
  steps: StepData[];
  totalXP: number;
  level: number;
}

const PracticeRoadScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryId } = route.params as { categoryId: string };
  const [isLoaded, setIsLoaded] = useState(false);

  const opacity = useSharedValue(0);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    setIsLoaded(true);
    opacity.value = withTiming(1, { duration: 500 });
  }, []);

  const categoryConfigs: Record<string, CategoryConfig> = {
    dating: {
      title: 'Dating & Romance',
      subtitle: 'Master the art of romantic connection',
      theme: 'dating',
      totalXP: 1450,
      level: 3,
      steps: [
        { id: 'conversation', title: 'Start a Conversation', icon: '💬', status: 'completed' },
        { id: 'playful', title: 'Be Playful', icon: '😄', status: 'completed' },
        { id: 'tension', title: 'Build Tension', icon: '💓', status: 'completed' },
        { id: 'spark', title: 'Create Spark', icon: '🔥', status: 'unlocked' },
        { id: 'rejection', title: 'Handle Rejection', icon: '❌', status: 'locked' },
        { id: 'chemistry', title: 'Build Chemistry', icon: '⚡', status: 'locked' },
        { id: 'escalation', title: 'Physical Escalation', icon: '👫', status: 'locked' }
      ]
    },
    interviews: {
      title: 'Job Interviews',
      subtitle: 'Land your dream job with confidence',
      theme: 'interview',
      totalXP: 890,
      level: 2,
      steps: [
        { id: 'intro', title: 'Introduce Yourself', icon: '🧑‍💼', status: 'completed' },
        { id: 'star', title: 'Answer with STAR', icon: '🎯', status: 'completed' },
        { id: 'eye-contact', title: 'Maintain Eye Contact', icon: '👁️', status: 'unlocked' },
        { id: 'time-management', title: 'Time Management', icon: '⏱️', status: 'unlocked' },
        { id: 'confidence', title: 'Show Confidence', icon: '🧘', status: 'locked' },
        { id: 'questions', title: 'Ask Smart Questions', icon: '🤔', status: 'locked' }
      ]
    },
    charisma: {
      title: 'Charisma & Social Manners',
      subtitle: 'Become naturally magnetic and likeable',
      theme: 'charisma',
      totalXP: 2100,
      level: 4,
      steps: [
        { id: 'first-impression', title: 'First Impressions', icon: '✨', status: 'completed' },
        { id: 'active-listening', title: 'Active Listening', icon: '👂', status: 'completed' },
        { id: 'storytelling', title: 'Storytelling', icon: '📚', status: 'completed' },
        { id: 'humor', title: 'Use Humor', icon: '😂', status: 'completed' },
        { id: 'presence', title: 'Command Presence', icon: '👑', status: 'unlocked' },
        { id: 'networking', title: 'Smart Networking', icon: '🤝', status: 'unlocked' },
        { id: 'influence', title: 'Gentle Influence', icon: '🎭', status: 'locked' }
      ]
    },
    speaking: {
      title: 'Public Speaking',
      subtitle: 'Captivate any audience with confidence',
      theme: 'speaking',
      totalXP: 650,
      level: 1,
      steps: [
        { id: 'nerves', title: 'Overcome Nerves', icon: '😰', status: 'completed' },
        { id: 'voice', title: 'Voice Control', icon: '🎤', status: 'unlocked' },
        { id: 'gestures', title: 'Body Language', icon: '👋', status: 'unlocked' },
        { id: 'structure', title: 'Speech Structure', icon: '🏗️', status: 'locked' },
        { id: 'audience', title: 'Read the Audience', icon: '👥', status: 'locked' },
        { id: 'impact', title: 'Memorable Endings', icon: '🎯', status: 'locked' }
      ]
    }
  };

  const config = categoryConfigs[categoryId];

  const getThemeColors = () => {
    switch (config?.theme) {
      case 'dating':
        return ['#6b2154', '#b83280', '#e91e63'];
      case 'interview':
        return ['#1e3a5f', '#1e88e5', '#42a5f5'];
      case 'charisma':
        return ['#1a4d3a', '#00c896', '#4dd0e1'];
      case 'speaking':
        return ['#5d3317', '#ff8f00', '#ffb74d'];
      default:
        return ['#0f1323', '#1a1a2e', '#16213e'];
    }
  };

  const getMotivationalMessage = () => {
    switch (config?.theme) {
      case 'dating':
        return "💕 Love is a skill that can be learned";
      case 'interview':
        return "🎯 Your next opportunity awaits";
      case 'charisma':
        return "✨ Charisma is your superpower";
      case 'speaking':
        return "🎤 Your voice deserves to be heard";
      default:
        return "🌟 Keep practicing, keep growing";
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (!config || !fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const completedSteps = config.steps.filter(step => step.status === 'completed').length;
  const progressPercentage = Math.round((completedSteps / config.steps.length) * 100);
  const themeColors = getThemeColors();

  const handleStepPress = (step: StepData) => {
    if (step.status !== 'locked') {
      navigation.navigate('QuickDrill' as never, {
        category: config.theme,
        skill: step.id,
        title: step.title
      } as never);
    }
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <StatusBar barStyle="light-content" />
      
      <LinearGradient
        colors={themeColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            {/* Back Button */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <ArrowLeft size={20} color="#FFFFFF" />
            </TouchableOpacity>

            {/* Header Content */}
            <View style={styles.headerContent}>
              <View style={styles.levelContainer}>
                <Crown size={20} color="#FEF3C7" />
                <Text style={styles.levelText}>Level {config.level}</Text>
              </View>
              
              <Text style={styles.categoryTitle}>{config.title}</Text>
              <Text style={styles.categorySubtitle}>{config.subtitle}</Text>
              
              {/* Progress Overview */}
              <View style={styles.progressOverview}>
                <View style={styles.progressHeader}>
                  <View style={styles.xpContainer}>
                    <Zap size={16} color="#FEF3C7" />
                    <Text style={styles.xpText}>
                      {config.totalXP.toLocaleString()} XP
                    </Text>
                  </View>
                  <Text style={styles.completionText}>
                    {progressPercentage}% complete
                  </Text>
                </View>
                
                <ProgressBar 
                  progress={progressPercentage} 
                  height={8}
                  backgroundColor="rgba(255, 255, 255, 0.2)"
                  progressColor="rgba(255, 255, 255, 0.8)"
                />
                
                <Text style={styles.progressFooter}>
                  {completedSteps} of {config.steps.length} skills mastered
                </Text>
              </View>
            </View>
          </View>

          {/* Steps Road */}
          <View style={styles.stepsContainer}>
            {/* Connector Line */}
            <View style={styles.connectorLine} />
            
            <View style={styles.stepsContent}>
              {config.steps.map((step, index) => (
                <PracticeStepCard
                  key={step.id}
                  step={step}
                  theme={config.theme}
                  order={index + 1}
                  onPress={() => handleStepPress(step)}
                  animationDelay={index * 100}
                />
              ))}
            </View>
          </View>

          {/* Motivational Footer */}
          <View style={styles.motivationalFooter}>
            <Text style={styles.motivationalText}>
              {getMotivationalMessage()}
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f1323',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 32,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    zIndex: 10,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  headerContent: {
    paddingHorizontal: 16,
    paddingTop: 48,
    alignItems: 'center',
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  levelText: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    color: '#FEF3C7',
  },
  categoryTitle: {
    fontSize: 28,
    fontFamily: 'Poppins_700Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  categorySubtitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 24,
  },
  progressOverview: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    width: '100%',
    maxWidth: 320,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  xpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  xpText: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    color: '#FFFFFF',
  },
  completionText: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    color: '#86EFAC',
  },
  progressFooter: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: 'rgba(255, 255, 255, 0.75)',
    textAlign: 'center',
    marginTop: 4,
  },
  stepsContainer: {
    paddingHorizontal: 24,
    position: 'relative',
  },
  connectorLine: {
    position: 'absolute',
    left: 32,
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  stepsContent: {
    gap: 16,
  },
  motivationalFooter: {
    marginTop: 48,
    marginHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  motivationalText: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
});

export default PracticeRoadScreen;