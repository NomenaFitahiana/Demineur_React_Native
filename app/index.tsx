import { Link } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>💣</Text>
      <Text style={styles.title}>DEMINEUR</Text>


      <Link href="/game" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>🎮 New Game</Text>
        </Pressable>
      </Link>

     <Link href="/game" asChild>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>▶️ Continu</Text>
      </Pressable>
     </Link>
     
      <Link href="/options" asChild>
        <Pressable style={styles.button}>
            <Text style={styles.buttonText}>⚙️ Options</Text>
        </Pressable>
      </Link>

      
     <Link href="/help" asChild>
        <Pressable style={styles.button}>
            <Text style={styles.buttonText}>❓ Help</Text>
        </Pressable>
    </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#e5e7eb',
    marginBottom: 40,
  },
  button: {
    width: 220,
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#1bb5fc',
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  disabled: {
    opacity: 0.5,
  },
});
