import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface BoxProps {
  value: number;
  revealed: boolean;
  onPress: () => void;
}

const COLORS: Record<number, string> = {
  1: '#00A2FF',
  2: '#00B300',
  3: '#FFD500',
  4: '#FF8C00',
  5: '#FF3B3B',
  6: '#B80000',
};

function Box({ value, revealed, onPress }: BoxProps) {
  let bgColor = revealed ? '#858889' : '#1bb5fc';
  let text = '';
  let textColor = COLORS[value] || 'black';

  if (revealed) {
    if (value === -1) {
      text = '💣';
      bgColor = '#6b6b6b';
    } else if (value > 0) {
      text = value.toString();
    }
  }

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: 'transparent' }}
      style={[styles.box, { backgroundColor: bgColor }]}
    >
      {text !== '' && (
        <Text style={{ color: textColor, fontWeight: 'bold' }}>
          {text}
        </Text>
      )}
    </Pressable>
  );
}

export default React.memo(Box);

const styles = StyleSheet.create({
  box: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
