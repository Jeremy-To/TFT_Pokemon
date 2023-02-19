import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './pokemonSlice';

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
});

export default store;