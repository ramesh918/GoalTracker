// dailyGoalsRecords.js
import { createSlice } from '@reduxjs/toolkit';

const dailyGoalsRecords = createSlice({
  name: 'records',
  initialState: { records: [] },
  reducers: {
    setRecords: (state, action) => {
      state.records = action.payload;
    },
  },
});

export const { setRecords } = dailyGoalsRecords.actions;
export default dailyGoalsRecords.reducer;