import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Heart, Users, Briefcase, Mic } from 'lucide-react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import CategoryCard from '../components/CategoryCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface CategoryData {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  theme: 'dating' | 'interview' | 'charisma' | 'speaking';
  xp: number;
  streak: number;
  completedMissions: number;
  totalMissions: number;
  route: string;
}

interface InfoCardData {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
}

const PracticeHubScreen = () => {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const categories: CategoryData[] = [
    {
      id: 'dating',
      title: 'Dating & Romance',
      icon: Heart,
      theme: 'dating',
      xp: 1450,
      streak: 7,
      completedMissions: 12,
      totalMissions: 20,
      route: 'PracticeRoad'
    },
    {
      id: 'interviews',
      title: 'Job Interviews',
      icon: Briefcase,
      theme: 'interview',
      xp: 890,
      streak: 3,
      completedMissions: 5,
      totalMissions: 15,
      route: 'PracticeRoad'
    },
    {
      id: 'charisma',
      title: 'Charisma & Social Manners',
      icon: Users,
      theme: 'charisma',
      xp: 2100,
      streak: 12,
      completedMissions: 18,
      totalMissions: 25,
      route: 'PracticeRoad'
    },
    {
      id: 'speaking',
      title: 'Public Speaking',
      icon: Mic,
      theme: 'speaking',
      xp: 650,
      streak: 2,
      completedMissions: 4,
      totalMissions: 12,
      route: 'PracticeRoad'
    }
  ];

  const infoCards: InfoCardData[] = [
    {
      id: 'level',
      icon: '🏆',
      title: 'Level 3',
      subtitle: 'Rising Charmer'
    },
    {
      id: 'badges',
      icon: '🎖️',
      title: '8 Badges',
      subtitle: 'Achievement hunter'
    },
    {
      id: 'progress',
      icon: '📈',
      title: 'Weekly XP',
      subtitle: '2,890 / 3,500'
    },
    {
      id: 'insight',
      icon: '💡',
      title: 'AI Insight',
      subtitle: 'Focus on eye contact'
    }
  ];

  const handleCategoryPress = (category: CategoryData) => {
    navigation.navigate(category.route as never, { categoryId: category.id } as never);
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f1323" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Practice Hub</Text>
          <Text style={styles.subtitle}>Choose your training world</Text>
        </View>

        {/* Category Cards */}
        <View style={styles.categoriesContainer}>
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              onPress={() => handleCategoryPress(category)}
              animationDelay={index * 100}
            />
          ))}
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>Your Journey</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.infoCardsContainer}
          >
            {infoCards.map((card, index) => (
              <View key={card.id} style={styles.infoCard}>
                <View style={styles.infoCardHeader}>
                  <Text style={styles.infoCardIcon}>{card.icon}</Text>
                  <Text style={styles.infoCardTitle}>{card.title}</Text>
                </View>
                <Text style={styles.infoCardSubtitle}>{card.subtitle}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Motivational Footer */}
        <View style={styles.motivationalFooter}>
          <Text style={styles.motivationalText}>
            "Every conversation is a chance to level up!" 💪
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1323',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f1323',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 32,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Poppins_700Bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#94A3B8',
    textAlign: 'center',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },
  statsSection: {
    paddingHorizontal: 16,
    marginTop: 32,
  },
  statsTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  infoCardsContainer: {
    paddingRight: 16,
    gap: 12,
  },
  infoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    padding: 16,
    width: 140,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  infoCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  infoCardIcon: {
    fontSize: 18,
  },
  infoCardTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    color: '#FFFFFF',
  },
  infoCardSubtitle: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#94A3B8',
  },
  motivationalFooter: {
    marginTop: 32,
    marginHorizontal: 16,
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.2)',
  },
  motivationalText: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FBB936',
    textAlign: 'center',
  },
});

export default PracticeHubScreen;