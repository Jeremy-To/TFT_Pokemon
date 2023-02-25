import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMyPkmId } from '../../redux/pokemonSlice';
import axios from 'axios';

function EvolveButton() {
	const myPkmId = useSelector((state) => state.pokemon.myPkmId);
	const dispatch = useDispatch();

	const [canEvolve, setCanEvolve] = useState(false);
	const [evolveToId, setEvolveToId] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);
		async function checkEvolution() {
			try {
				const response = await axios.get(
					`https://pokeapi.co/api/v2/pokemon-species/${myPkmId}/`
				);
				const evolutionUrl = response.data.evolution_chain.url;
				const evolutionResponse = await axios.get(evolutionUrl);
				const chain = evolutionResponse.data.chain;
				const hasEvolution = !!chain.evolves_to.length;
				if (hasEvolution) {
					const nextEvolution = chain.evolves_to[0].species;
					const nextEvolutionResponse = await axios.get(
						`https://pokeapi.co/api/v2/pokemon/${nextEvolution.name}`
					);
					setEvolveToId(nextEvolutionResponse.data.id);
				}
				setCanEvolve(hasEvolution);
				setLoading(false);
			} catch (error) {
				console.error(error);
				setError('Failed to load evolution data');
				setLoading(false);
				setCanEvolve(false);
			}
		}

		checkEvolution();
	}, [myPkmId]);

	const handleEvolve = () => {
		if (canEvolve) {
			dispatch(setMyPkmId(evolveToId));
		}
	};

	return (
		<div>
			{canEvolve ? (
				<>
					<div className="m-4 cursor-pointer p-2 rounded-md bg-yellow-50 text-center hover:bg-yellow-900 hover:text-white active:bg-yellow-400">
						<button onClick={handleEvolve}>
							<p>Evolve to {evolveToId?.name}</p>
						</button>
						{loading && <p>Loading...</p>}
						{evolveToId?.sprites?.front_default && (
							<img
								src={evolveToId.sprites.front_default}
								alt={evolveToId.name}
								key={evolveToId.id}
							/>
						)}
					</div>
				</>
			) : (
				<div className="m-4 p-2 rounded-md bg-gray-300 text-center">
					{error || 'Cannot evolve'}
				</div>
			)}
		</div>
	);
}

export default EvolveButton;
