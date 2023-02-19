import { createSlice } from '@reduxjs/toolkit';

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    initialPokemonId: null,
    selectedPokemonId: null, 
  },
  reducers: {
    setIdOrName: (state, action) => {
      state.idOrName = action.payload;
    },
    setSelectedPokemonId: (state, action) => {
      state.selectedPokemonId = action.payload;
    },
  },
});

export const { setIdOrName, setSelectedPokemonId } = pokemonSlice.actions;

export default pokemonSlice.reducer;
