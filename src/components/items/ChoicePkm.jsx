import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMyPkmId } from '../../redux/pokemonSlice';
import { Link } from 'react-router-dom';

function ChoicePkm() {
  const { difficultyLevel } = useSelector((state) => state.pokemon);

  const [randomPokemons, setRandomPokemons] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchRandomPokemons() {
      let maxTotalStats = 400;
      let minTotalStats = 0;
      let numPokemons = 3;
      if (difficultyLevel === 'medium') {
        maxTotalStats = 500;
        minTotalStats = 400;
      } else if (difficultyLevel === 'hard') {
        maxTotalStats = Infinity;
        minTotalStats = 500;
        numPokemons = 5;
      }

      const randomPokemons = [];

      while (randomPokemons.length < numPokemons) {
        // Randomly select a Pokemon
        const randomPokemonId = Math.floor(Math.random() * 898) + 1;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`);
        const pokemon = await response.json();

        // Check if the total stats of the Pokemon matches the difficulty level
        const totalStats = pokemon.stats.reduce((acc, cur) => acc + cur.base_stat, 0);
        if (totalStats < maxTotalStats && totalStats > minTotalStats) {
          randomPokemons.push({
            id: pokemon.id,
            name: pokemon.name,
            totalStats: totalStats,
            sprites: pokemon.sprites,
          });
        }
      }

      setRandomPokemons(randomPokemons);
    }

    fetchRandomPokemons();
  }, [difficultyLevel]);

  const handleSelectPokemon = (pokemon) => {
    dispatch(setMyPkmId(pokemon.id));
  };

  return (
    <div>
      <h2>{`Difficulty: ${difficultyLevel}`}</h2>
      <div>
        <p>Select a Pokemon:</p>
        {randomPokemons.map((pokemon) => (
          <div key={pokemon.id}>
            <img src={pokemon.sprites.front_default} alt={`Sprite of ${pokemon.name}`} />
            <p>Total Stats: {pokemon.totalStats}</p>
            <Link to='/fight'> 
              <button onClick={() => handleSelectPokemon(pokemon)}>Select</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChoicePkm;
