
import Box from '@/components/Box';
import { generateBoard } from '@/utils/game';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';

const SIZE = 20;
const BOMBS = 40;

export default function Index() {
  const [tab, setTab] = useState<number[][]>([]);
  const [revealed, setRevealed] = useState<boolean[][]>([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  const handlePress = (row: number, col: number) => {
    if (gameOver || revealed[row][col]) return;

    const newRevealed = revealed.map(r => [...r]);
    newRevealed[row][col] = true;

    if (tab[row][col] === -1) {
      // si bombe, révéler tout
      for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
          newRevealed[r][c] = true;
        }
      }
      setRevealed(newRevealed);
      setGameOver(true);
    } else {
      setRevealed(newRevealed);
    }
  };

  const resetGame = () => {
    const board = generateBoard(SIZE, BOMBS);
    setTab(board);
    setRevealed(new Array(SIZE).fill(false).map(() => new Array(SIZE).fill(false)));
    setGameOver(false);
  };

  return (
    <View style={styles.container}>
      {tab.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => (
            <Box
              key={colIndex}
              value={cell}
              revealed={revealed[rowIndex][colIndex]}
              onPress={() => handlePress(rowIndex, colIndex)}
            />
          ))}
        </View>
      ))}

    
      {gameOver && (
        <View style={styles.buttonContainer}>
          <Button title="Rejouer" onPress={resetGame} color="#1bb5fc" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, alignItems: 'center' },
  row: { flexDirection: 'row' },
  buttonContainer: { marginTop: 20 },
});
