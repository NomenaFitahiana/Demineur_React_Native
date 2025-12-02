
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface BoxProps {
  value: number;
  revealed: boolean;
  onPress: () => void;
}

const COLORS: { [key: number]: string } = {
  1: '#00A2FF',
  2: '#00B300',
  3: '#FFD500',
  4: '#FF8C00',
  5: '#FF3B3B',
  6: '#B80000',
};

export default function Box({ value, revealed, onPress }: BoxProps) {
  let bgColor = revealed ? '#c7ccceff' : '#1bb5fc';
  let textColor = COLORS[value] || 'black';
  let text = '';

  if (revealed) {
    if (value === -1) {
      bgColor = 'grey';
      text = '💣';
    } else if (value > 0) {
      text = value.toString();
    }
  }

  return (
    <Pressable onPress={onPress} style={[styles.box, { backgroundColor: bgColor }]}>
      {text !== '' && <Text style={{ color: textColor, fontWeight: 'bold' }}>{text}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
