import { create } from "zustand";

export type DifficultyLevel = {
  name: string;
  rows: number;
  cols: number;
  bombs: number;
};

export const DIFFICULTY_LEVELS = {
  FACILE: { name: "Easy", rows: 10, cols: 10, bombs: 20 },
  MEDIUM: { name: "Medium", rows: 15, cols: 15, bombs: 40 },
  DIFFICILE: { name: "Hard", rows: 20, cols: 20, bombs: 80 },
};

export const DEFAULT_DIFFICULTY = DIFFICULTY_LEVELS.FACILE;

type GameState = {
  volume: number;
  previousVolume: number;
  isVibrationEnabled: boolean;
  difficulty: DifficultyLevel;

  increaseVolume: () => void;
  decreaseVolume: () => void;
  setVolume: (volume: number) => void;
  setPreviousVolume: (volume: number) => void;

  toggleVibration: () => void;
  setDifficulty: (difficulty: DifficultyLevel) => void;
};

export const useGameStore = create<GameState>((set) => ({
  volume: 50,
  previousVolume: 50,
  isVibrationEnabled: true,
  difficulty: DEFAULT_DIFFICULTY,

  increaseVolume: () =>
    set((state) => ({
      volume: Math.min(state.volume + 10, 100),
    })),

  decreaseVolume: () =>
    set((state) => ({
      volume: Math.max(state.volume - 10, 0),
    })),

  setVolume: (volume) =>
    set({
      volume: Math.max(0, Math.min(volume, 100)),
    }),

  setPreviousVolume: (volume) => set({ previousVolume: volume }),

  toggleVibration: () =>
    set((state) => ({
      isVibrationEnabled: !state.isVibrationEnabled,
    })),

  setDifficulty: (difficulty) => set({ difficulty }),
}));
