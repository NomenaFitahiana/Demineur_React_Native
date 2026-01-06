import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import type { DifficultyLevel } from "../../utils/gameStore";
import { DIFFICULTY_LEVELS, useGameStore } from "../../utils/gameStore";

export default function OptionsScreen() {
  const {
    volume,
    isVibrationEnabled,
    difficulty,
    increaseVolume,
    decreaseVolume,
    setVolume,
    toggleVibration,
    setDifficulty,
    setPreviousVolume,
    previousVolume,
  } = useGameStore();

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDifficultySelect = (difficultyLevel: DifficultyLevel) => {
    setDifficulty(difficultyLevel);
    setIsDropdownOpen(false);
  };

  const toggleMute = () => {
    if (volume > 0) {
      setPreviousVolume(volume);
      setVolume(0);
    } else {
      setVolume(previousVolume > 0 ? previousVolume : 50);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-slate-900"
      contentContainerClassName="items-center px-5 pt-6 pb-10"
    >
      <Text className="text-3xl font-bold text-gray-200 mb-8">⚙️ Settings</Text>

      {/* 🔊 VOLUME */}
      <View className="w-full max-w-md bg-white/10 border border-gray-300 rounded-lg p-4 mb-6">
        <View className="flex-row items-center justify-between">
          <Pressable
            className="w-12 h-12 rounded-lg bg-cyan-500 items-center justify-center"
            onPress={decreaseVolume}
          >
            <Text className="text-2xl font-bold text-slate-900">−</Text>
          </Pressable>

          <View className="flex-row items-center">
            <View className="w-40 h-4 bg-gray-500 rounded-full overflow-hidden">
              <View
                className="h-full bg-cyan-500"
                style={{ width: `${volume}%` }}
              />
            </View>
            <Text className="ml-3 text-gray-200 font-bold text-2xl">
              {volume}%
            </Text>
          </View>

          <Pressable
            className="w-12 h-12 rounded-lg bg-cyan-500 items-center justify-center"
            onPress={increaseVolume}
          >
            <Text className="text-2xl font-bold text-slate-900">+</Text>
          </Pressable>

          <Pressable
            className="w-12 h-12 rounded-lg bg-cyan-500 items-center justify-center ml-2"
            onPress={toggleMute}
          >
            <Text className="text-2xl">{volume > 0 ? "🔊" : "🔇"}</Text>
          </Pressable>
        </View>
      </View>

      {/* 📳 VIBRATION */}
      <View className="w-full max-w-md bg-white/10 border border-gray-300 rounded-lg p-4 mb-6">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-gray-200">Vibration</Text>

          <Pressable
            className="w-20 h-12 rounded-full bg-gray-400 p-1"
            onPress={toggleVibration}
          >
            <View
              className={`h-full w-1/2 rounded-full ${
                isVibrationEnabled ? "bg-green-400 ml-1" : "bg-gray-600 ml-auto"
              }`}
            />
          </Pressable>
        </View>
      </View>

      {/* 🎯 DIFFICULTY */}
      <View className="w-full max-w-md bg-white/10 border border-gray-300 rounded-lg p-4 mb-6">
        <Text className="text-2xl font-bold text-gray-200 mb-3">
          Difficulty
        </Text>

        <View className="items-center">
          <Pressable
            className="w-48 h-12 rounded-lg bg-cyan-500 items-center justify-center mb-2"
            onPress={toggleDropdown}
          >
            <Text className="text-2xl font-bold text-slate-900">
              {difficulty.name}
            </Text>
          </Pressable>

          {isDropdownOpen && (
            <View className="w-48 rounded-lg bg-gray-200 overflow-hidden">
              {Object.values(DIFFICULTY_LEVELS).map((item, index) => (
                <Pressable
                  key={item.name}
                  className={`h-12 items-center justify-center ${
                    difficulty.name === item.name ? "bg-green-400" : ""
                  }`}
                  onPress={() => handleDifficultySelect(item)}
                >
                  <Text className="text-2xl font-bold text-slate-900">
                    {item.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
