import React from "react";
import { Pressable, Text } from "react-native";

interface BoxProps {
  value: number;
  revealed: boolean;
  onPress: () => void;
}

const COLORS: Record<number, string> = {
  1: "#00A2FF",
  2: "#00B300",
  3: "#FFD500",
  4: "#FF8C00",
  5: "#FF3B3B",
  6: "#B80000",
};

function Box({ value, revealed, onPress }: BoxProps) {
  let bgColor = revealed ? "#858889" : "#1bb5fc";
  let text = "";
  let textColor = COLORS[value] || "black";

  if (revealed) {
    if (value === -1) {
      text = "💣";
      bgColor = "#6b6b6b";
    } else if (value > 0) {
      text = value.toString();
    }
  }

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "transparent" }}
      className="w-5 h-5 border border-black items-center justify-center"
      style={{ backgroundColor: bgColor }}
    >
      {text !== "" && (
        <Text className="font-bold" style={{ color: textColor }}>
          {text}
        </Text>
      )}
    </Pressable>
  );
}

export default React.memo(Box);
