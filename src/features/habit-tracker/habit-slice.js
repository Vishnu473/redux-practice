import { createSlice } from "@reduxjs/toolkit";

const initialState = { habits: [] };

const habitSlicer = createSlice({
  name: "habits",
  initialState,
  reducers: {
    addHabit: (state, action) => {
      const habit = {
        id: Date.now().toString(),
        name: action.payload.name.trim(),
        frequency: action.payload.frequency,
        completedDates: [],
        createdAt: new Date().toISOString(),
      };

      state.habits.push(habit);
    },
    toggleHabit: (state, action) => {
      const habit = state.habits.find((h) => h.id === action.payload.id);

      if (habit) {
        const dateIndex = habit.completedDates.indexOf(action.payload.date);
        if (dateIndex > -1) {
          habit.completedDates.splice(dateIndex, 1);
        } else {
          habit.completedDates.push(action.payload.date);
        }
      }
    },
    deleteHabit: (state, action) => {
      state.habits = state.habits.filter((h) => h.id !== action.payload.id);
    },
  },
});

export const { addHabit, toggleHabit, deleteHabit } = habitSlicer.actions;
export default habitSlicer.reducer;
