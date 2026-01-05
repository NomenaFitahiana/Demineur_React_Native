import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function HelpScreen() {
  return (
    <ScrollView className="flex-1 bg-slate-900" contentContainerClassName="p-5">
      <Text className="text-3xl font-bold text-slate-200 text-center mb-5">
        ❓ Help - How to Play
      </Text>

      {/* Objective */}
      <View className="bg-slate-800 p-4 rounded-lg mb-4">
        <Text className="text-2xl font-bold text-sky-300 mb-2">
          🎯 Objective
        </Text>
        <Text className="text-lg text-slate-100 leading-6">
          The goal of the game is to uncover all the squares without hitting a
          bomb. Each square may be empty or contain a bomb.
        </Text>
      </View>

      {/* Rules */}
      <View className="bg-slate-800 p-4 rounded-lg mb-4">
        <Text className="text-2xl font-bold text-sky-300 mb-2">📝 Rules</Text>

        <Text className="text-lg text-slate-100 mb-1 leading-6">
          • Open a square to reveal it.
        </Text>
        <Text className="text-lg text-slate-100 mb-1 leading-6">
          • If the square is empty, it shows the number of bombs around it.
        </Text>
        <Text className="text-lg text-slate-100 mb-1 leading-6">
          • If there are no bombs nearby, the square turns grey.
        </Text>
        <Text className="text-lg text-slate-100 mb-1 leading-6">
          • Hitting a bomb ends the game immediately.
        </Text>
        <Text className="text-lg text-slate-100 leading-6">
          • You can mark suspicious squares with a flag.
        </Text>
      </View>

      {/* Tips */}
      <View className="bg-slate-800 p-4 rounded-lg mb-4">
        <Text className="text-2xl font-bold text-sky-300 mb-2">💡 Tips</Text>
        <Text className="text-lg text-slate-100 mb-1 leading-6">
          • Start by opening corners or edges.
        </Text>
        <Text className="text-lg text-slate-100 leading-6">
          • Pay attention to the numbers — they indicate nearby bombs.
        </Text>
      </View>

      <Text className="text-lg text-sky-400 text-center mt-3">
        Have fun and good luck! 💣
      </Text>
    </ScrollView>
  );
}
