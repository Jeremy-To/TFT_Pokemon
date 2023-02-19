import { useState, useEffect } from 'react';
import axios from 'axios';

function PokemonSprite() {
  const [spriteUrl, setSpriteUrl] = useState('');
  const [statsSum, setStatsSum] = useState(null);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const randomPokemonId = Math.floor(Math.random() * 898) + 1;
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`);
        const spriteUrl = response.data.sprites.front_default;
        const stats = response.data.stats;
        const sum = stats.reduce((total, stat) => total + stat.base_stat, 0);
        setSpriteUrl(spriteUrl);
        setStatsSum(sum);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPokemon();
  }, []);

  return (
    <div className="w-64 h-64 mx-auto mt-4 border-2 rounded-md flex flex-col items-center justify-center">
      {spriteUrl && (
        <img
          src={spriteUrl}
          alt={`Sprite of a random Pokemon`}
          className="mx-auto object-contain h-full"
        />
      )}
      {statsSum !== null && (
        <p className="text-center text-lg font-bold mt-4">Stats Sum: {statsSum}</p>
      )}
    </div>
  );
}

export default PokemonSprite;
