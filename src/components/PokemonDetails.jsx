import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PokemonDetails() {
  const { id } = useParams();
  const [spriteUrl, setSpriteUrl] = useState('');
  const [health, setHealth] = useState(100);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const spriteUrl = response.data.sprites.back_default;
        setSpriteUrl(spriteUrl);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPokemon();
  }, [id]);

  return (
    <div className="flex flex-col items-center justify-center">
      {spriteUrl && (
        <img
          src={spriteUrl}
          alt={`Back sprite of ${id}`}
          className="w-64 h-64 mx-auto mt-4"
        />
      )}
      <div className="mt-4">
        <p className="text-center text-lg font-bold">Health:</p>
        <div className="w-64 h-4 bg-gray-400">
          <div className="h-full bg-red-600" style={{ width: `${health}%` }}></div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetails;
