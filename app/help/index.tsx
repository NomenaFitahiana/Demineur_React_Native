import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function HelpScreen() {
  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        backgroundColor: "#0f172a",
        flexGrow: 1,
      }}
    >
      <Text className="text-2xl font-bold text-slate-200 text-center mb-5">
        ❓ Help - How to Play
      </Text>

      <View className="bg-slate-800 p-3.5 rounded-lg mb-3.5">
        <Text className="text-xl font-bold text-sky-300 mb-2.5">
          🎯 Objective
        </Text>
        <Text className="text-base text-slate-100 mb-1.5 leading-5">
          The goal of the game is to uncover all the squares without hitting a
          bomb. Each square may be empty or contain a bomb.
        </Text>
      </View>

      <View className="bg-slate-800 p-3.5 rounded-lg mb-3.5">
        <Text className="text-xl font-bold text-sky-300 mb-2.5">📝 Rules</Text>
        <Text className="text-base text-slate-100 mb-1.5 leading-5">
          - Open a square to reveal it.
        </Text>
        <Text className="text-base text-slate-100 mb-1.5 leading-5">
          - If the square is empty, it shows the number of bombs around it.
        </Text>
        <Text className="text-base text-slate-100 mb-1.5 leading-5">
          - If there are no bombs nearby, the square turns grey.
        </Text>
        <Text className="text-base text-slate-100 mb-1.5 leading-5">
          - Hitting a bomb ends the game immediately.
        </Text>
        <Text className="text-base text-slate-100 mb-1.5 leading-5">
          - You can mark suspicious squares with a flag to remember where bombs
          are.
        </Text>
      </View>

      <View className="bg-slate-800 p-3.5 rounded-lg mb-3.5">
        <Text className="text-xl font-bold text-sky-300 mb-2.5">💡 Tips</Text>
        <Text className="text-base text-slate-100 mb-1.5 leading-5">
          - Start by opening corners or edges to gather clues safely.
        </Text>
        <Text className="text-base text-slate-100 mb-1.5 leading-5">
          - Pay attention to the numbers—they indicate how many bombs are
          adjacent.
        </Text>
      </View>

      <Text className="text-base text-sky-400 text-center mt-2.5">
        Have fun and good luck! 💣
      </Text>
    </ScrollView>
  );
}
