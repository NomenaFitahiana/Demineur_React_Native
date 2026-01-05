import { create } from "zustand";

export type DifficultyLevel = {
  name: string;
  rows: number;
  cols: number;
  bombs: number;
};

export const DIFFICULTY_LEVELS = {
  FACILE: { name: "Facile", rows: 10, cols: 10, bombs: 20 },
  MEDIUM: { name: "Medium", rows: 15, cols: 15, bombs: 40 },
  DIFFICILE: { name: "Difficile", rows: 20, cols: 20, bombs: 80 },
};

export const DEFAULT_DIFFICULTY = DIFFICULTY_LEVELS.FACILE;

type GameState = {
  volume: number;
  isVibrationEnabled: boolean;
  difficulty: DifficultyLevel;
  increaseVolume: () => void;
  decreaseVolume: () => void;
  setVolume: (volume: number) => void;
  toggleVibration: () => void;
  setDifficulty: (difficulty: DifficultyLevel) => void;
  previousVolume: number;
  setPreviousVolume: (volume: number) => void;
};

export const useGameStore = create<GameState>((set) => ({
  volume: 50,
  isVibrationEnabled: true,
  difficulty: DEFAULT_DIFFICULTY,
  previousVolume: 0,

  increaseVolume: () =>
    set((state) => {
      const newVolume = Math.min(state.volume + 10, 100);
      return { volume: Math.max(newVolume, 0) };
    }),
  decreaseVolume: () =>
    set((state) => {
      const newVolume = Math.max(state.volume - 10, 0);
      return { volume: Math.min(newVolume, 100) };
    }),
  setVolume: (volume: number) =>
    set({ volume: Math.max(0, Math.min(volume, 100)) }),
  toggleVibration: () =>
    set((state) => ({ isVibrationEnabled: !state.isVibrationEnabled })),
  setDifficulty: (difficulty: DifficultyLevel) => set({ difficulty }),
  setPreviousVolume: (volume: number) => set({ previousVolume: volume }),
}));
