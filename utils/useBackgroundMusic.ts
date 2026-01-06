import { useAudioPlayer } from "expo-audio";
import { useEffect } from "react";
import { useGameStore } from "./gameStore";

export function useBackgroundMusic() {
  const volume = useGameStore((state) => state.volume);

  const player = useAudioPlayer(require("../assets/sounds/Background.mp3"));

  useEffect(() => {
    player.loop = true;
    player.play();

    return () => {
      player.remove();
    };
  }, []);

  useEffect(() => {
    if (volume === 0) {
      player.muted = true;
    } else {
      player.muted = false;
      player.volume = volume / 100;
    }
  }, [volume]);

  return player;
}
