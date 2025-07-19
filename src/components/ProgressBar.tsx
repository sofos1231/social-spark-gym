
import React from 'react';
import { View, Text } from 'react-native';

interface ProgressBarProps {
  current: number;
  max: number;
  label?: string;
  showNumbers?: boolean;
  size?: 'sm' | 'md' | 'lg';
  intense?: boolean;
  progress?: number;
  height?: number;
  backgroundColor?: string;
  progressColor?: string;
}

const ProgressBar = ({ 
  current, 
  max, 
  label, 
  showNumbers = true, 
  size = 'md',
  intense = false,
  progress,
  height = 12,
  backgroundColor = 'rgba(255, 255, 255, 0.2)',
  progressColor = 'rgba(255, 255, 255, 0.8)'
}: ProgressBarProps) => {
  const percentage = progress !== undefined ? progress : Math.min((current / max) * 100, 100);
  
  const getHeight = () => {
    if (height) return height;
    switch (size) {
      case 'sm': return 8;
      case 'md': return 12;
      case 'lg': return 16;
      default: return 12;
    }
  };

  const barHeight = getHeight();

  return (
    <View style={{ width: '100%' }}>
      {(label || showNumbers) && (
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: 8 
        }}>
          {label && (
            <Text style={{ 
              fontSize: 14, 
              fontWeight: '500', 
              color: '#FFFFFF' 
            }}>
              {label}
            </Text>
          )}
          {showNumbers && (
            <Text style={{ 
              fontSize: 12, 
              color: 'rgba(255, 255, 255, 0.7)' 
            }}>
              {current}/{max}
            </Text>
          )}
        </View>
      )}
      
      <View style={{
        height: barHeight,
        backgroundColor: backgroundColor,
        borderRadius: barHeight / 2,
        overflow: 'hidden'
      }}>
        <View 
          style={{
            height: '100%',
            width: `${percentage}%`,
            backgroundColor: intense ? '#10B981' : progressColor,
            borderRadius: barHeight / 2
          }}
        />
      </View>
      
      {percentage >= 100 && (
        <View style={{ 
          marginTop: 4, 
          flexDirection: 'row', 
          alignItems: 'center', 
          gap: 4 
        }}>
          <Text style={{ fontSize: 12 }}>🎉</Text>
          <Text style={{ 
            fontSize: 12, 
            color: '#10B981', 
            fontWeight: '500' 
          }}>
            Complete!
          </Text>
        </View>
      )}
    </View>
  );
};

export default ProgressBar;
