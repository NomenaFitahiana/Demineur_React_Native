import { create } from "zustand";

type GameState = {
  onVolume: boolean;
  volumeLevel: number;
  onVibration: boolean;
  gameLevel: number;
  toggleVolume: () => void;
  increaseVolume: () => void;
  decreaseVolume: () => void;
  toggleVibration: () => void;
  setGameLevel: (level: number) => void;
};

export const useGameStore = create<GameState>((set) => ({
  onVolume: true,
  volumeLevel: 50,
  onVibration: true,
  gameLevel: 1,
  toggleVolume: () => set((state) => ({ onVolume: !state.onVolume })),
  increaseVolume: () =>
    set((state) => ({ volumeLevel: Math.min(state.volumeLevel + 10, 100) })),
  decreaseVolume: () =>
    set((state) => ({ volumeLevel: Math.max(state.volumeLevel - 10, 0) })),
  toggleVibration: () => set((state) => ({ onVibration: !state.onVibration })),
  setGameLevel: (level: number) => set({ gameLevel: level }),
}));
