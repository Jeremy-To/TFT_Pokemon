import { createSlice } from '@reduxjs/toolkit';

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    difficultyLevel: null,
    myPkmId: null,
    enemyPkmId: null,
  },
  reducers: {
    setDifficultyLevel: (state, action) => {
      state.difficultyLevel = action.payload;
    },
    setMyPkmId: (state, action) => {
      state.myPkmId = action.payload;
    },
    setEnemyPkmId: (state, action) => {
      state.enemyPkmId = action.payload;
    },
  },
});

export const {
  setDifficultyLevel,
  setMyPkmId,
  setEnemyPkmId,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
