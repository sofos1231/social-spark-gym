
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface PracticeCardProps {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  theme: 'dating' | 'interview' | 'charisma' | 'speaking';
  xp: number;
  streak: number;
  completedMissions: number;
  totalMissions: number;
  onClick: () => void;
  animationDelay?: number;
}

const PracticeCard: React.FC<PracticeCardProps> = ({ 
  id,
  title,
  icon: Icon,
  theme,
  xp,
  streak,
  completedMissions,
  totalMissions,
  onClick,
  animationDelay = 0 
}) => {
  const scale = useSharedValue(0.95);
  const opacity = useSharedValue(0);
  const shimmerX = useSharedValue(-200);
  const pressScale = useSharedValue(1);

  const progressPercentage = Math.round((completedMissions / totalMissions) * 100);
  const level = Math.floor(xp / 500) + 1;

  useEffect(() => {
    opacity.value = withDelay(animationDelay, withTiming(1, { duration: 500 }));
    scale.value = withDelay(animationDelay, withSpring(1, { damping: 15, stiffness: 150 }));
  }, [animationDelay]);

  const getThemeColors = () => {
    switch (theme) {
      case 'dating':
        return {
          colors: ['#6b2154', '#b83280', '#e91e63'],
          borderColor: '#e91e63',
          shadowColor: '#e91e63',
        };
      case 'interview':
        return {
          colors: ['#1e3a5f', '#1e88e5', '#42a5f5'],
          borderColor: '#42a5f5',
          shadowColor: '#42a5f5',
        };
      case 'charisma':
        return {
          colors: ['#1a4d3a', '#00c896', '#4dd0e1'],
          borderColor: '#4dd0e1',
          shadowColor: '#4dd0e1',
        };
      case 'speaking':
        return {
          colors: ['#5d3317', '#ff8f00', '#ffb74d'],
          borderColor: '#ffb74d',
          shadowColor: '#ffb74d',
        };
      default:
        return {
          colors: ['#1a1a2e', '#16213e', '#0f1323'],
          borderColor: '#94A3B8',
          shadowColor: '#94A3B8',
        };
    }
  };

  const themeColors = getThemeColors();

  const animatedContainerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { scale: scale.value * pressScale.value }
    ],
  }));

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shimmerX.value }],
  }));

  const handlePressIn = () => {
    pressScale.value = withSpring(0.98, { damping: 15, stiffness: 300 });
    shimmerX.value = withTiming(SCREEN_WIDTH + 100, { duration: 800 });
  };

  const handlePressOut = () => {
    pressScale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  const handlePress = () => {
    pressScale.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withTiming(1, { duration: 200 })
    );
    
    setTimeout(() => {
      onClick();
    }, 150);
  };

  return (
    <Animated.View style={[styles.container, animatedContainerStyle]}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        style={styles.touchable}
      >
        <LinearGradient
          colors={themeColors.colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.card,
            {
              borderColor: themeColors.borderColor,
              shadowColor: themeColors.shadowColor,
            }
          ]}
        >
          {/* Shimmer Effect */}
          <Animated.View style={[styles.shimmer, shimmerStyle]} />
          
          {/* Card Content */}
          <View style={styles.content}>
            {/* Header Row */}
            <View style={styles.headerRow}>
              {/* Left Side - Icon and Title */}
              <View style={styles.leftSection}>
                <View style={styles.iconContainer}>
                  <Icon size={24} color="#FFFFFF" />
                </View>
                <View style={styles.titleSection}>
                  <Text style={styles.title}>{title}</Text>
                  <Text style={styles.xpText}>
                    {xp.toLocaleString()} XP
                  </Text>
                </View>
              </View>

              {/* Right Side - Streak and Missions */}
              <View style={styles.rightSection}>
                <View style={styles.streakContainer}>
                  <Text style={styles.fireIcon}>🔥</Text>
                  <Text style={styles.streakNumber}>{streak}</Text>
                </View>
                <View style={styles.missionsContainer}>
                  <Text style={styles.missionsText}>
                    <Text style={styles.completedMissions}>{completedMissions}</Text>
                    <Text style={styles.totalMissions}>/{totalMissions}</Text>
                  </Text>
                  <Text style={styles.missionsLabel}>missions</Text>
                </View>
              </View>
            </View>

            {/* Progress Section */}
            <View style={styles.progressSection}>
              <View style={styles.progressBarContainer}>
                <View 
                  style={[
                    styles.progressBar, 
                    { width: `${progressPercentage}%` }
                  ]} 
                />
              </View>
              <View style={styles.progressInfo}>
                <Text style={styles.progressText}>
                  {progressPercentage}% complete
                </Text>
                <Text style={styles.levelText}>
                  Level {level}
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
  },
  touchable: {
    borderRadius: 20,
  },
  card: {
    height: 144,
    borderRadius: 20,
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 2,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: -200,
    bottom: 0,
    width: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    opacity: 0.6,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    zIndex: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  titleSection: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 22,
    marginBottom: 4,
  },
  xpText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  rightSection: {
    alignItems: 'flex-end',
    marginLeft: 12,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  fireIcon: {
    fontSize: 14,
  },
  streakNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FEF3C7',
  },
  missionsContainer: {
    alignItems: 'flex-end',
  },
  missionsText: {
    fontSize: 14,
    fontWeight: '700',
  },
  completedMissions: {
    color: 'rgba(255, 255, 255, 0.9)',
  },
  totalMissions: {
    color: 'rgba(255, 255, 255, 0.6)',
  },
  missionsLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.75)',
  },
  progressSection: {
    gap: 8,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#86EFAC',
  },
  levelText: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.75)',
  },
});

export default PracticeCard;
