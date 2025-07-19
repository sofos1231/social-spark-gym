
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { CheckCircle2, Lock } from 'lucide-react-native';

interface StepData {
  id: string;
  title: string;
  icon: string;
  status: 'locked' | 'unlocked' | 'completed';
}

interface PracticeStepCardProps {
  step: StepData;
  theme: 'dating' | 'interview' | 'charisma' | 'speaking';
  order: number;
  onPress?: () => void;
  animationDelay?: number;
}

const PracticeStepCard: React.FC<PracticeStepCardProps> = ({
  step,
  theme,
  order,
  onPress,
  animationDelay = 0
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    opacity.value = withDelay(animationDelay, withTiming(1, { duration: 500 }));
    translateY.value = withDelay(animationDelay, withTiming(0, { duration: 500 }));
  }, [animationDelay]);

  const getThemeColors = () => {
    switch (theme) {
      case 'dating':
        return {
          gradient: ['#6b2154', '#b83280'],
          borderColor: '#e91e63',
          shadowColor: '#e91e63',
        };
      case 'interview':
        return {
          gradient: ['#1e3a5f', '#1e88e5'],
          borderColor: '#42a5f5',
          shadowColor: '#42a5f5',
        };
      case 'charisma':
        return {
          gradient: ['#1a4d3a', '#00c896'],
          borderColor: '#4dd0e1',
          shadowColor: '#4dd0e1',
        };
      case 'speaking':
        return {
          gradient: ['#5d3317', '#ff8f00'],
          borderColor: '#ffb74d',
          shadowColor: '#ffb74d',
        };
      default:
        return {
          gradient: ['#1a1a2e', '#16213e'],
          borderColor: '#94A3B8',
          shadowColor: '#94A3B8',
        };
    }
  };

  const themeColors = getThemeColors();

  const getStatusStyles = () => {
    switch (step.status) {
      case 'completed':
        return {
          backgroundColor: themeColors.gradient[0],
          borderColor: themeColors.borderColor,
          textColor: '#FFFFFF',
          interactive: true,
          shadow: true
        };
      case 'unlocked':
        return {
          backgroundColor: themeColors.gradient[1],
          borderColor: themeColors.borderColor,
          textColor: '#FFFFFF',
          interactive: true,
          shadow: true
        };
      case 'locked':
        return {
          backgroundColor: 'rgba(100, 100, 100, 0.3)',
          borderColor: 'rgba(148, 163, 184, 0.3)',
          textColor: '#94A3B8',
          interactive: false,
          shadow: false
        };
      default:
        return {
          backgroundColor: '#1a1a2e',
          borderColor: '#94A3B8',
          textColor: '#FFFFFF',
          interactive: false,
          shadow: false
        };
    }
  };

  const statusStyles = getStatusStyles();

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableOpacity
        activeOpacity={statusStyles.interactive ? 0.7 : 1}
        onPress={statusStyles.interactive ? onPress : undefined}
        disabled={!statusStyles.interactive}
        style={[
          styles.card,
          {
            backgroundColor: statusStyles.backgroundColor,
            borderColor: statusStyles.borderColor,
            shadowColor: statusStyles.shadow ? statusStyles.borderColor : 'transparent',
          }
        ]}
      >
        {/* Step number indicator */}
        <View style={[styles.stepNumber, { borderColor: statusStyles.textColor }]}>
          <Text style={[styles.stepNumberText, { color: statusStyles.textColor }]}>
            {order}
          </Text>
        </View>

        <View style={styles.content}>
          {/* Icon area */}
          <View style={styles.iconArea}>
            {step.status === 'completed' ? (
              <CheckCircle2 size={24} color="#10B981" />
            ) : step.status === 'locked' ? (
              <Lock size={20} color="#94A3B8" />
            ) : (
              <Text style={[styles.iconEmoji, { color: statusStyles.textColor }]}>
                {step.icon}
              </Text>
            )}
          </View>

          {/* Content */}
          <View style={styles.textContent}>
            <Text style={[styles.title, { color: statusStyles.textColor }]}>
              {step.title}
            </Text>
            <View style={styles.statusBadge}>
              <Text style={[
                styles.statusText,
                {
                  backgroundColor: step.status === 'completed' 
                    ? 'rgba(16, 185, 129, 0.2)' 
                    : step.status === 'unlocked'
                    ? 'rgba(245, 158, 11, 0.2)'
                    : 'rgba(100, 100, 100, 0.2)',
                  color: step.status === 'completed' 
                    ? '#10B981' 
                    : step.status === 'unlocked'
                    ? '#F59E0B'
                    : '#94A3B8'
                }
              ]}>
                {step.status === 'completed' ? 'Mastered' : step.status === 'unlocked' ? 'Ready' : 'Locked'}
              </Text>
            </View>
          </View>

          {/* Status indicator */}
          {step.status === 'completed' && (
            <View style={[styles.statusDot, { backgroundColor: '#10B981' }]} />
          )}
          {step.status === 'unlocked' && (
            <View style={[styles.statusDot, { backgroundColor: '#F59E0B' }]} />
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginLeft: 12,
  },
  stepNumber: {
    position: 'absolute',
    left: -12,
    top: '50%',
    marginTop: -12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0f1323',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    gap: 12,
  },
  iconArea: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: {
    fontSize: 24,
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  statusBadge: {
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default PracticeStepCard;
