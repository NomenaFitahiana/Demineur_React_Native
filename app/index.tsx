
import Box from '@/components/Box';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function Index() {
  const [tab, setTab] = useState<number[][]>(
    new Array(20).fill(0).map(() => new Array(20).fill(0))
  );

  const handlePress = (rowIndex: number, colIndex: number) => {
    const newTab = tab.map((row, rIdx) =>
      row.map((cell, cIdx) =>
        rIdx === rowIndex && cIdx === colIndex ? 1 : cell
      )
    );
    setTab(newTab);
  };

  return (
    <View style={styles.container}>
      {tab.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => (
            <Box
              key={colIndex}
              value={cell}
              onPress={() => handlePress(rowIndex, colIndex)}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
  },
});
