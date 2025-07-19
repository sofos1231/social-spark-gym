
import React, { useState, useEffect } from 'react';
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
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
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

  const config = categoryConfigs[categoryId || ''];

  if (!config) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Category not found</Text>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.errorButton}
        >
          <Text style={styles.errorButtonText}>Return to Practice Hub</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const getThemeGradient = () => {
    switch (config.theme) {
      case 'dating':
        return ['#3d1a3d', '#6b2154', '#b83280', '#e91e63'];
      case 'interview':
        return ['#0d1421', '#1e3a5f', '#1e88e5', '#42a5f5'];
      case 'charisma':
        return ['#0d2818', '#1a4d3a', '#00c896', '#4dd0e1'];
      case 'speaking':
        return ['#2d1810', '#5d3317', '#ff8f00', '#ffb74d'];
      default:
        return ['#0f1323', '#1a1a2e'];
    }
  };

  const completedSteps = config.steps.filter(step => step.status === 'completed').length;
  const progressPercentage = Math.round((completedSteps / config.steps.length) * 100);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={getThemeGradient()}
        locations={[0, 0.3, 0.7, 1]}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          {/* Back button */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <ArrowLeft size={20} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Header content */}
          <View style={styles.headerContent}>
            <View style={styles.levelContainer}>
              <Crown size={20} color="#FDE047" />
              <Text style={styles.levelText}>Level {config.level}</Text>
            </View>
            <Text style={styles.headerTitle}>{config.title}</Text>
            <Text style={styles.headerSubtitle}>{config.subtitle}</Text>
            
            {/* Progress overview */}
            <View style={styles.progressOverview}>
              <View style={styles.progressHeader}>
                <View style={styles.xpContainer}>
                  <Zap size={16} color="#FDE047" />
                  <Text style={styles.xpText}>{config.totalXP.toLocaleString()} XP</Text>
                </View>
                <Text style={styles.progressText}>{progressPercentage}% complete</Text>
              </View>
              <ProgressBar
                current={completedSteps}
                max={config.steps.length}
                showNumbers={false}
                backgroundColor="rgba(255, 255, 255, 0.2)"
                progressColor="rgba(255, 255, 255, 0.8)"
                height={8}
              />
              <Text style={styles.progressSubtext}>
                {completedSteps} of {config.steps.length} skills mastered
              </Text>
            </View>
          </View>
        </View>

        {/* Steps Road */}
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.stepsContainer}>
            {/* Vertical connector line */}
            <View style={styles.connectorLine} />
            
            <View style={styles.stepsList}>
              {config.steps.map((step, index) => (
                <PracticeStepCard
                  key={step.id}
                  step={step}
                  theme={config.theme}
                  order={index + 1}
                  onPress={() => {
                    if (step.status !== 'locked') {
                      // Navigate to specific drill/training
                      navigation.navigate('QuickDrill' as never, { 
                        category: config.theme, 
                        skill: step.id,
                        title: step.title 
                      } as never);
                    }
                  }}
                  animationDelay={index * 100}
                />
              ))}
            </View>
          </View>

          {/* Bottom motivational section */}
          <View style={styles.motivationalSection}>
            <Text style={styles.motivationalText}>
              {config.theme === 'dating' && "💕 Love is a skill that can be learned"}
              {config.theme === 'interview' && "🎯 Your next opportunity awaits"}
              {config.theme === 'charisma' && "✨ Charisma is your superpower"}
              {config.theme === 'speaking' && "🎤 Your voice deserves to be heard"}
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
  gradient: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f1323',
    padding: 20,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  errorButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  errorButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 16,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 16,
    zIndex: 10,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  headerContent: {
    alignItems: 'center',
    paddingTop: 48,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  levelText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FEF3C7',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 24,
    textAlign: 'center',
  },
  progressOverview: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    width: '100%',
    maxWidth: 320,
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
    gap: 4,
  },
  xpText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#86EFAC',
  },
  progressSubtext: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.75)',
    textAlign: 'center',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
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
  stepsList: {
    gap: 16,
  },
  motivationalSection: {
    marginTop: 48,
    marginHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
  },
  motivationalText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
});

export default PracticeRoadScreen;
