import { create } from 'zustand'

export const useDayGoalStore = create((set) => ({
  goal: 10000,
  setGoal: (newGoal: any) => set({ goal: newGoal }),
}))