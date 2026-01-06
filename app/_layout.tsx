import { Stack } from "expo-router";
import "../global.css";
import { useBackgroundMusic } from "../utils/useBackgroundMusic";

export default function RootLayout() {
  useBackgroundMusic();

  return <Stack />;
}
