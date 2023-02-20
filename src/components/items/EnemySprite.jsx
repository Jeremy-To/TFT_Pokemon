import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { setEnemyPkmId } from '../../redux/pokemonSlice';
import ChoicePkm from './ChoicePkm';

function EnemySprite() {
  const { difficultyLevel } = useSelector((state) => state.pokemon);
  const dispatch = useDispatch();

  const [randomPokemon, setRandomPokemon] = useState(null);

  useEffect(() => {
    async function fetchRandomPokemon() {
      let maxTotalStats = 400;
      let minTotalStats = 0;
      if (difficultyLevel === 'medium') {
        maxTotalStats = 500;
        minTotalStats = 400;
      } else if (difficultyLevel === 'hard') {
        maxTotalStats = Infinity;
        minTotalStats = 500;
      }

      let randomPokemon = null;

      while (!randomPokemon) {
        // Randomly select a Pokemon
        const randomPokemonId = Math.floor(Math.random() * 898) + 1;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`);
        const pokemon = await response.json();

        // Check if the total stats of the Pokemon matches the difficulty level
        const totalStats = pokemon.stats.reduce((acc, cur) => acc + cur.base_stat, 0);
        if (totalStats < maxTotalStats && totalStats > minTotalStats) {
          randomPokemon = {
            id: pokemon.id,
            name: pokemon.name,
            totalStats: totalStats,
            sprites: pokemon.sprites,
          };
          dispatch(setEnemyPkmId(pokemon.id));
        }
      }

      setRandomPokemon(randomPokemon);
    }

    fetchRandomPokemon();
  }, [difficultyLevel, dispatch]);

  if (!randomPokemon) {
    return <p>Loading...</p>;
  }

  return (
    <section className='bg-red-200 flex flex-col justify-center items-center'>
      <h2 className='bg-gray-400 m-2 rounded-lg p-2'>{`Difficulty: ${difficultyLevel}`}</h2>
      <div className='m-2 bg-white p-4 rounded-lg flex flex-col justify-center items-center'>
        <p>Enemy Pokemon:</p>
        <p className='font-bold text-lg'>{randomPokemon.name}</p>
        <img src={randomPokemon.sprites.front_default} alt={`Sprite of ${randomPokemon.name}`} />
        <p>Power Stats: {randomPokemon.totalStats}</p>
      </div>
      <p className='bg-gray-400 p-2 rounded'>Select a Pokemon:</p>
      <ChoicePkm />
    </section>
  );
}

export default EnemySprite;
