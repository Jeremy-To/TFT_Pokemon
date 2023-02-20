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
    <div className='flex' >
        {randomPokemons.map((pokemon) => (
          <div  key={pokemon.id} className='flex flex-col justify-center items-center bg-white m-2 rounded-lg' >
            <img src={pokemon.sprites.front_default} alt={`Sprite of ${pokemon.name}`} />
            <div className='flex items-center justify-center flex-col p-4'>
              <p className='mx-2 text-lg font-bold'>{pokemon.name}</p>
              <p>Power Stats: {pokemon.totalStats}</p>
            </div>
            <div className='rounded-md p-2 bg-blue-500 text-white hover:bg-blue-800 my-2'>
              <Link to='/fight'> 
                <button onClick={() => handleSelectPokemon(pokemon)}>Select</button>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ChoicePkm;
