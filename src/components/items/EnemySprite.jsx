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
    <div>
      <h2>{`Difficulty: ${difficultyLevel}`}</h2>
      <div>
        <p>Random Pokemon:</p>
        <img src={randomPokemon.sprites.front_default} alt={`Sprite of ${randomPokemon.name}`} />
        <p>Total Stats: {randomPokemon.totalStats}</p>
      </div>
      <ChoicePkm />
    </div>
  );
}

export default EnemySprite;
