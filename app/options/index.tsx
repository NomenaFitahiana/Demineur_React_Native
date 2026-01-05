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
    <ScrollView className="p-5 bg-slate-900 flex-grow">
      <Text className="text-2xl font-bold text-gray-200 text-center mb-5">
        ⚙️ Options
      </Text>

      <View className="w-full flex flex-row items-center justify-center">
        <Pressable
          className="w-11.75 p-3.5 rounded-lg bg-cyan-500 items-center"
          onPress={decreaseVolume}
        >
          <Text className="text-base font-bold text-slate-900">-</Text>
        </Pressable>

        <View className="flex-row mx-2.5 items-center">
          <View className="w-50 h-5 bg-gray-500 rounded-full overflow-hidden">
            <View
              className="h-full bg-cyan-500"
              style={{ width: `${volumeLevel}%` }}
            />
          </View>
          <Text className="ml-2.5 text-gray-200 text-base font-bold">
            {volumeLevel}%
          </Text>
        </View>

        <Pressable
          className="w-11.75 p-3.5 rounded-lg bg-cyan-500 items-center"
          onPress={increaseVolume}
        >
          <Text className="text-base font-bold text-slate-900">+</Text>
        </Pressable>

        <Pressable
          className="w-11.75 p-3.5 rounded-lg bg-cyan-500 items-center mx-1.5"
          onPress={toggleVolume}
        >
          <Text className="text-base font-bold text-slate-900">
            {onVolume ? "🔊" : "🔇"}
          </Text>
        </Pressable>
      </View>

      <Pressable
        className="w-11.75 p-3.5 rounded-lg bg-cyan-500 items-center mt-2.5"
        onPress={toggleVibration}
      >
        <Text className="text-base font-bold text-slate-900">
          {onVibration ? "📳" : "🚫"}
        </Text>
      </Pressable>

      <Text className="text-xl font-bold text-gray-200 text-center my-5">
        Niveaux
      </Text>
      <ScrollView horizontal={true} className="px-2.5 items-center">
        {[1, 2, 3].map((level) => (
          <Pressable
            key={level}
            className={`w-15 h-15 rounded-full ${
              gameLevel === level ? "bg-cyan-500" : "bg-gray-500"
            } justify-center items-center mx-2.5`}
            onPress={() => setGameLevel(level)}
          >
            <Text className="text-2xl font-bold text-slate-900">{level}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </ScrollView>
  );
}
