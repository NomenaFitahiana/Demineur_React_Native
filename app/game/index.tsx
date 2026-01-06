import Box from "@/components/Box";
import { generateBoard } from "@/utils/game";
import { useGameStore } from "@/utils/gameStore";
import * as Haptics from "expo-haptics";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function GameScreen() {
  const [board, setBoard] = useState<number[][]>([]);
  const [revealed, setRevealed] = useState<boolean[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [scale, setScale] = useState(1);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const { difficulty, isVibrationEnabled } = useGameStore();
  const { rows, cols, bombs } = difficulty;

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const vibrationInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const startContinuousVibration = () => {
    if (!isVibrationEnabled) return;

    vibrationInterval.current = setInterval(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }, 700);
  };

  const stopContinuousVibration = () => {
    if (vibrationInterval.current) {
      clearInterval(vibrationInterval.current);
      vibrationInterval.current = null;
    }
  };

  const initGame = () => {
    stopContinuousVibration();
    setBoard(generateBoard(rows, cols, bombs));
    setRevealed(
      Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => false)
      )
    );
    setGameOver(false);

    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    initGame();
  }, [rows, cols, bombs]);

  useEffect(() => {
    return () => {
      stopContinuousVibration();
    };
  }, []);

  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  const revealEmptyCells = (
    startRow: number,
    startCol: number,
    newRevealed: boolean[][]
  ) => {
    const stack: [number, number][] = [[startRow, startCol]];

    while (stack.length > 0) {
      const [row, col] = stack.pop()!;

      if (
        row < 0 ||
        row >= rows ||
        col < 0 ||
        col >= cols ||
        newRevealed[row][col]
      ) {
        continue;
      }

      newRevealed[row][col] = true;

      if (board[row][col] === 0) {
        directions.forEach(([dx, dy]) => {
          stack.push([row + dx, col + dy]);
        });
      }
    }
  };

  const handlePress = (row: number, col: number) => {
    if (gameOver || revealed[row][col]) return;

    const newRevealed = revealed.map((r) => [...r]);

    if (board[row][col] === -1) {
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          newRevealed[r][c] = true;
        }
      }

      setRevealed(newRevealed);
      setGameOver(true);

      startContinuousVibration();
      return;
    }

    if (board[row][col] === 0) {
      revealEmptyCells(row, col, newRevealed);
    } else {
      newRevealed[row][col] = true;
    }

    setRevealed(newRevealed);
  };

  const shouldUseScrollView = rows > 20 || cols > 20;

  return (
    <View className="flex-1 items-center justify-center bg-[#0f172a] px-4">
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <View className="mb-6">
          {shouldUseScrollView ? (
            <ScrollView horizontal>
              <ScrollView>
                {board.map((row, rowIndex) => (
                  <View key={rowIndex} className="flex-row">
                    {row.map((cell, colIndex) => (
                      <Box
                        key={colIndex}
                        value={cell}
                        revealed={revealed[rowIndex]?.[colIndex]}
                        onPress={() => handlePress(rowIndex, colIndex)}
                      />
                    ))}
                  </View>
                ))}
              </ScrollView>
            </ScrollView>
          ) : (
            board.map((row, rowIndex) => (
              <View key={rowIndex} className="flex-row">
                {row.map((cell, colIndex) => (
                  <Box
                    key={colIndex}
                    value={cell}
                    revealed={revealed[rowIndex]?.[colIndex]}
                    onPress={() => handlePress(rowIndex, colIndex)}
                  />
                ))}
              </View>
            ))
          )}
        </View>
      </Animated.View>

      {gameOver && (
        <View className="items-center">
          <Text className="text-xl font-bold text-red-400 mb-4">
            💥 Game Over
          </Text>

          <Pressable
            onPress={initGame}
            className="w-[220px] px-6 py-4 rounded-xl bg-[#1bb5fc] items-center"
          >
            <Text className="text-lg font-bold text-[#0f172a]">🔄 Rejouer</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
