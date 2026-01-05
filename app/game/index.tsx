import Box from "@/components/Box";
import { generateBoard } from "@/utils/game";
import * as Haptics from "expo-haptics";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View } from "react-native";

const SIZE = 20;
const BOMBS = 40;

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

export default function GameScreen() {
  const [board, setBoard] = useState<number[][]>([]);
  const [revealed, setRevealed] = useState<boolean[][]>([]);
  const [gameOver, setGameOver] = useState(false);

  const initGame = () => {
    setBoard(generateBoard(SIZE, BOMBS));
    setRevealed(
      Array.from({ length: SIZE }, () =>
        Array.from({ length: SIZE }, () => false)
      )
    );
    setGameOver(false);
  };

  useEffect(() => {
    initGame();
  }, []);

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
        row >= SIZE ||
        col < 0 ||
        col >= SIZE ||
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
      for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
          newRevealed[r][c] = true;
        }
      }
      setRevealed(newRevealed);
      setGameOver(true);

      console.log("Vibration");

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

  return (
    <View style={styles.container}>
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
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

      {gameOver && (
        <View style={styles.buttonContainer}>
          <Button title="Rejouer" onPress={initGame} color="#1bb5fc" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  buttonContainer: {
    marginTop: 20,
  },
});
