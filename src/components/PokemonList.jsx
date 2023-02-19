import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedPokemonId } from '../redux/pokemonSlice';
import { useNavigate } from 'react-router-dom';

function PokemonList() {
  const dispatch = useDispatch();
  const { selectedPokemonId } = useSelector((state) => state.pokemon);
  
  const [randomPokemonList, setRandomPokemonList] = useState([]);
  const [isLoading ,setIsLoading] = useState(false);
  const navigate = useNavigate()
  
  useEffect(() => {
    async function fetchRandomPokemon() {
      const MAX_TOTAL_STATS = 400;
      let pokemonList = [];

      while (pokemonList.length < 3) {
        // Randomly select a Pokemon
        const randomPokemonId = Math.floor(Math.random() * 898) + 1;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`);
        const pokemon = await response.json();

        // Check if the total stats of the Pokemon is less than 400
        const totalStats = pokemon.stats.reduce((acc, cur) => acc + cur.base_stat, 0);
        if (totalStats < MAX_TOTAL_STATS) {
          pokemonList.push({
            id: pokemon.id,
            name: pokemon.name,
          });
        }
      }

      setRandomPokemonList(pokemonList);
    }

    fetchRandomPokemon();
    setIsLoading(true);
  }, []);

  const handlePokemonSelection = (event) => {
    const pokemonId = event.target.value;
    dispatch(setSelectedPokemonId(pokemonId));
    navigate(`/pokemon/${pokemonId}`);
  };

  return (
    <div>
        <label htmlFor="pokemon-list">Choose a Pokémon:</label>
    {isLoading && ( 
        <ul id="pokemon-list" value={selectedPokemonId}>
          {randomPokemonList.map((pokemon) => (
            <li key={pokemon.id} value={pokemon.id} onClick={handlePokemonSelection}>
              {pokemon.name}
              <img src={pokemon.sprites.front_default} alt={`Sprite of ${pokemon.name}`} className="mx-auto object-contain h-full" />
            </li>
          ))}
        </ul>
          )}
      </div>
  );
}

export default PokemonList;
