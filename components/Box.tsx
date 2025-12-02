
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

interface BoxProps {
  value: number;
  onPress: () => void;
}

export default function Box({ value, onPress }: BoxProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.box,
        { backgroundColor: value === 1 ? '#858889' : '#1bb5fc' },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  box: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
});
