import Box from "@/components/Box";
import { generateBoard } from "@/utils/game";
import { useGameStore } from "@/utils/gameStore";
import * as Haptics from "expo-haptics";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
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
  const [isZooming, setIsZooming] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const { difficulty } = useGameStore();
  const { rows, cols, bombs } = difficulty;
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const initGame = () => {
    setBoard(generateBoard(rows, cols, bombs));
    setRevealed(
      Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => false)
      )
    );
    setGameOver(false);
    setScale(1);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    initGame();
  }, [rows, cols, bombs]);

  // Gestion du zoom avec PanResponder
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setIsZooming(true);
      },
      onPanResponderMove: (_, gestureState) => {
        // Gestion du zoom avec deux doigts (pincement)
        if (gestureState.numberActiveTouches === 2) {
          const distance = Math.sqrt(
            Math.pow(gestureState.moveX - gestureState.x0, 2) +
              Math.pow(gestureState.moveY - gestureState.y0, 2)
          );
          const initialDistance = Math.sqrt(
            Math.pow(gestureState.x0 - gestureState.x0, 2) +
              Math.pow(gestureState.y0 - gestureState.y0, 2)
          );
          const newScale = distance / initialDistance;
          let calculatedScale = scale * newScale;

          // Ajuster le zoom en fonction de la taille du plateau et de l'écran
          // Pour les grands écrans (30x30), on permet un zoom plus important
          const cellSize = 20; // taille de base d'une cellule
          const totalWidth = cols * cellSize;
          const totalHeight = rows * cellSize;

          // Calculer le zoom maximal basé sur la taille de l'écran
          const maxScaleByWidth = screenWidth / (totalWidth * 0.6); // au moins 60% de la grille visible
          const maxScaleByHeight = screenHeight / (totalHeight * 0.6); // au moins 60% de la grille visible

          const maxScale = Math.min(
            3.0,
            Math.max(1, Math.min(maxScaleByWidth, maxScaleByHeight))
          );
          const minScale = Math.max(
            0.3,
            Math.min(1, screenWidth / (cols * 40))
          );

          // Limiter le zoom pour éviter que le plateau ne devienne trop petit ou trop grand
          calculatedScale = Math.max(
            minScale,
            Math.min(maxScale, calculatedScale)
          );

          setScale(calculatedScale);
          Animated.spring(scaleAnim, {
            toValue: calculatedScale,
            useNativeDriver: true,
          }).start();
        }
      },
      onPanResponderRelease: () => {
        setIsZooming(false);
      },
    })
  ).current;

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

      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      return;
    }

    if (board[row][col] === 0) {
      revealEmptyCells(row, col, newRevealed);
    } else {
      newRevealed[row][col] = true;
    }

    setRevealed(newRevealed);
  };

  // Pour les grilles très grandes (30x30), utiliser ScrollView
  const shouldUseScrollView = rows > 20 || cols > 20;

  return (
    <View className="flex-1 items-center justify-center bg-[#0f172a] px-4">
      {/* Conteneur pour le zoom */}
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
        }}
        {...panResponder.panHandlers}
      >
        {/* Plateau */}
        <View className="mb-6">
          {shouldUseScrollView ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              contentContainerClassName="items-center justify-center"
            >
              <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerClassName="items-center justify-center"
              >
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

      {/* Game Over */}
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
