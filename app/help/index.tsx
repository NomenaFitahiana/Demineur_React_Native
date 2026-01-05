import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HelpScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.mainTitle}>❓ Help - How to Play</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Objective</Text>
        <Text style={styles.paragraph}>
          The goal of the game is to uncover all the squares without hitting a bomb. 
          Each square may be empty or contain a bomb.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📝 Rules</Text>
        <Text style={styles.paragraph}>- Open a square to reveal it.</Text>
        <Text style={styles.paragraph}>- If the square is empty, it shows the number of bombs around it.</Text>
        <Text style={styles.paragraph}>- If there are no bombs nearby, the square turns grey.</Text>
        <Text style={styles.paragraph}>- Hitting a bomb ends the game immediately.</Text>
        <Text style={styles.paragraph}>- You can mark suspicious squares with a flag to remember where bombs are.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 Tips</Text>
        <Text style={styles.paragraph}>- Start by opening corners or edges to gather clues safely.</Text>
        <Text style={styles.paragraph}>- Pay attention to the numbers—they indicate how many bombs are adjacent.</Text>
      </View>

      <Text style={styles.footer}>Have fun and good luck! 💣</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#0f172a',
    flexGrow: 1,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e5e7eb',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    backgroundColor: '#1e293b',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7dd3fc',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    color: '#f1f5f9',
    marginBottom: 6,
    lineHeight: 22,
  },
  footer: {
    fontSize: 16,
    color: '#38bdf8',
    textAlign: 'center',
    marginTop: 10,
  },
});
