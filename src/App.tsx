import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './styles/themes';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor={colors.background} />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Practice App</Text>
          <Text style={styles.subtitle}>React Native Conversion Complete</Text>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Ready for Development</Text>
            <Text style={styles.cardText}>
              Your app has been successfully converted to React Native with Expo.
              The foundation is now in place for further development.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.foreground,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.mutedForeground,
    marginBottom: 32,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.card,
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    maxWidth: 300,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.foreground,
    marginBottom: 12,
    textAlign: 'center',
  },
  cardText: {
    fontSize: 14,
    color: colors.mutedForeground,
    lineHeight: 20,
    textAlign: 'center',
  },
});