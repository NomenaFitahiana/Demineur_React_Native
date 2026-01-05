import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useGameStore } from "../../utils/gameStore";

export default function OptionsScreen() {
  const {
    onVolume,
    volumeLevel,
    onVibration,
    gameLevel,
    toggleVolume,
    increaseVolume,
    decreaseVolume,
    toggleVibration,
    setGameLevel,
  } = useGameStore();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.mainTitle}>⚙️ Options</Text>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={decreaseVolume}>
          <Text style={styles.buttonText}>-</Text>
        </Pressable>

        <View style={styles.volumeBar}>
          <View style={styles.volumeBarContainer}>
            <View
              style={[styles.volumeBarFill, { width: `${volumeLevel}%` }]}
            />
          </View>
          <Text style={styles.volumeText}>{volumeLevel}%</Text>
        </View>

        <Pressable style={styles.button} onPress={increaseVolume}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>

        <Pressable
          style={[styles.button, { marginHorizontal: 6 }]}
          onPress={toggleVolume}
        >
          <Text style={styles.buttonText}>{onVolume ? "🔊" : "🔇"}</Text>
        </Pressable>
      </View>

      <Pressable
        style={[styles.button, { marginTop: 10 }]}
        onPress={toggleVibration}
      >
        <Text style={styles.buttonText}>{onVibration ? "📳" : "🚫"}</Text>
      </Pressable>

      <Text style={styles.sectionTitle}>Niveaux</Text>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.levelsContainer}
      >
        {[1, 2, 3].map((level) => (
          <Pressable
            key={level}
            style={[
              styles.levelButton,
              gameLevel === level && styles.levelButtonSelected,
            ]}
            onPress={() => setGameLevel(level)}
          >
            <Text style={styles.levelButtonText}>{level}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = {
  container: {
    padding: 20,
    backgroundColor: "#0f172a",
    flexGrow: 1,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: "700" as const,
    color: "#e5e7eb",
    textAlign: "center" as const,
    marginBottom: 20,
  },
  buttonContainer: {
    width: "100%" as const,
    display: "flex" as const,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  button: {
    width: 47,
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#1bb5fc",
    alignItems: "center" as const,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold" as const,
    color: "#0f172a",
  },
  volumeBar: {
    flexDirection: "row" as const,
    marginHorizontal: 10,
    alignItems: "center" as const,
  },
  volumeBarContainer: {
    width: 200,
    height: 20,
    backgroundColor: "#6b7280",
    borderRadius: 10,
    overflow: "hidden" as const,
  },
  volumeBarFill: {
    height: "100%" as const,
    backgroundColor: "#1bb5fc",
  },
  volumeText: {
    marginLeft: 10,
    color: "#e5e7eb",
    fontSize: 16,
    fontWeight: "bold" as const,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: "#e5e7eb",
    textAlign: "center" as const,
    marginVertical: 20,
  },
  levelsContainer: {
    paddingHorizontal: 10,
    alignItems: "center" as const,
  },
  levelButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#6b7280",
    justifyContent: "center" as const,
    alignItems: "center" as const,
    marginHorizontal: 10,
  },
  levelButtonSelected: {
    backgroundColor: "#1bb5fc",
  },
  levelButtonText: {
    fontSize: 24,
    fontWeight: "bold" as const,
    color: "#0f172a",
  },
};
