import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import type { DifficultyLevel } from "../../utils/gameStore";
import { DIFFICULTY_LEVELS, useGameStore } from "../../utils/gameStore";

export default function OptionsScreen() {
  const {
    volume,
    isVibrationEnabled,
    difficulty,
    setVolume,
    toggleVibration,
    setDifficulty,
  } = useGameStore();

  const [tempVibration, setTempVibration] = React.useState(isVibrationEnabled);
  const [tempDifficulty, setTempDifficulty] =
    React.useState<DifficultyLevel>(difficulty);

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const increaseVolume = () => setVolume(Math.min(volume + 10, 100));

  const decreaseVolume = () => setVolume(Math.max(volume - 10, 0));

  const toggleMute = () => setVolume(volume > 0 ? 0 : 50);

  const handleSave = () => {
    if (tempVibration !== isVibrationEnabled) {
      toggleVibration();
    }
    setDifficulty(tempDifficulty);
  };

  return (
    <ScrollView
      className="flex-1 bg-slate-900"
      contentContainerClassName="items-center px-5 pt-6 pb-10"
    >
      <Text className="text-3xl font-bold text-gray-200 mb-8">⚙️ Settings</Text>

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

      <View className="w-full max-w-md bg-white/10 border border-gray-300 rounded-lg p-4 mb-6">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-gray-200">Vibration</Text>

          <Pressable
            className="w-20 h-12 rounded-full bg-gray-400 p-1"
            onPress={() => setTempVibration((v) => !v)}
          >
            <View
              className={`h-full w-1/2 rounded-full ${
                tempVibration ? "bg-green-400 ml-1" : "bg-gray-600 ml-auto"
              }`}
            />
          </Pressable>
        </View>
      </View>

      <View className="w-full max-w-md bg-white/10 border border-gray-300 rounded-lg p-4 mb-6">
        <Text className="text-2xl font-bold text-gray-200 mb-3">
          Difficulty
        </Text>

        <View className="items-center">
          <Pressable
            className="w-48 h-12 rounded-lg bg-cyan-500 items-center justify-center mb-2"
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Text className="text-2xl font-bold text-slate-900">
              {tempDifficulty.name}
            </Text>
          </Pressable>

          {isDropdownOpen && (
            <View className="w-48 rounded-lg bg-gray-200 overflow-hidden">
              {Object.values(DIFFICULTY_LEVELS).map((item) => (
                <Pressable
                  key={item.name}
                  className={`h-12 items-center justify-center ${
                    tempDifficulty.name === item.name ? "bg-green-400" : ""
                  }`}
                  onPress={() => {
                    setTempDifficulty(item);
                    setIsDropdownOpen(false);
                  }}
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

      <Pressable
        className="w-[60%] h-14 bg-green-400 rounded-lg items-center justify-center mt-4"
        onPress={handleSave}
      >
        <Text className="text-2xl font-bold text-slate-900">Save</Text>
      </Pressable>
    </ScrollView>
  );
}
