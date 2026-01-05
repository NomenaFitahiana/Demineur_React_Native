import { Link } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-[#0f172a] items-center justify-center">
      <Text className="text-[80px] mb-4">💣</Text>

      <Text className="text-4xl font-bold text-[#e5e7eb] mb-10">DEMINEUR</Text>

      <Link href="/game" asChild>
        <Pressable className="w-[220px] px-4 py-3 rounded-lg bg-[#1bb5fc] mb-3 items-center">
          <Text className="text-base font-bold text-[#0f172a]">
            🎮 New Game
          </Text>
        </Pressable>
      </Link>

      <Link href="/game" asChild>
        <Pressable className="w-[220px] px-4 py-3 rounded-lg bg-[#1bb5fc] mb-3 items-center">
          <Text className="text-base font-bold text-[#0f172a]">▶️ Continu</Text>
        </Pressable>
      </Link>

      <Link href="/options" asChild>
        <Pressable className="w-[220px] px-4 py-3 rounded-lg bg-[#1bb5fc] mb-3 items-center">
          <Text className="text-base font-bold text-[#0f172a]">⚙️ Options</Text>
        </Pressable>
      </Link>

      <Link href="/help" asChild>
        <Pressable className="w-[220px] px-4 py-3 rounded-lg bg-[#1bb5fc] items-center">
          <Text className="text-base font-bold text-[#0f172a]">❓ Help</Text>
        </Pressable>
      </Link>
    </View>
  );
}
