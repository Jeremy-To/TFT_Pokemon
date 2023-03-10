import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEnemyPkmId } from '../../redux/pokemonSlice';
import PokemonCard from '../layout/Card';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import EvolveButton from './EvolveButton';

function FightActions() {
	const myPkmId = useSelector((state) => state.pokemon.myPkmId);
	const enemyPkmId = useSelector((state) => state.pokemon.enemyPkmId);
	const dispatch = useDispatch();

	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [myPokemon, setMyPokemon] = useState(null);
	const [enemyPokemon, setEnemyPokemon] = useState(null);
	const [enemyHealth, setEnemyHealth] = useState(0);
  
  Modal.setAppElement('#root');

	useEffect(() => {
		if (myPkmId) {
			fetch(`https://pokeapi.co/api/v2/pokemon/${myPkmId}`)
				.then((response) => response.json())
				.then((data) => setMyPokemon(data))
				.catch((error) => console.log(error));
		}
	}, [myPkmId]);

	useEffect(() => {
		if (enemyPkmId) {
			fetch(`https://pokeapi.co/api/v2/pokemon/${enemyPkmId}`)
				.then((response) => response.json())
				.then((data) => {
					setEnemyPokemon(data);
					setEnemyHealth(
						data.stats.reduce((acc, stat) => acc + stat.base_stat, 0)
					);
				})
				.catch((error) => console.log(error));
		}
	}, [enemyPkmId]);

	const handleAttack = () => {
		const myAttack = myPokemon.stats.find(
			(stat) => stat.stat.name === 'attack'
		).base_stat;
		const mySpecialAttack = myPokemon.stats.find(
			(stat) => stat.stat.name === 'special-attack'
		).base_stat;
		const enemyDefense = enemyPokemon.stats.find(
			(stat) => stat.stat.name === 'defense'
		).base_stat;
		const enemySpecialDefense = enemyPokemon.stats.find(
			(stat) => stat.stat.name === 'special-defense'
		).base_stat;

		const damage = Math.round(
			(myAttack + mySpecialAttack) * 2 - (enemyDefense + enemySpecialDefense)
		);

		if (damage >= enemyHealth) {
			setEnemyHealth(0);
			setModalIsOpen(true);
			dispatch(setEnemyPkmId(null));
		} else {
			setEnemyHealth(enemyHealth - damage);
		}
	};
	return (
		<section className="w-1/2">
			<PokemonCard
				myPokemon={myPokemon}
				enemyHealth={enemyHealth}
				enemyPokemon={enemyPokemon}
			/>
			<div className="m-4 cursor-pointer  p-2 rounded-md bg-red-50 flex justify-center hover:bg-red-900 hover:text-white active:bg-red-400">
				<button onClick={handleAttack}>Attack</button>
			</div>
			<EvolveButton />
			<Modal isOpen={modalIsOpen}>
				<div className="bg-green-300 flex flex-col justify-center items-center h-full">
					<h2 className="text-6xl font-bold m-4">Victory!</h2>
					<p className="text-lg italic">
						Enemy Pokemon fainted! Thanks for playing!
					</p>
					<p className="mb-6"> Want to play again?</p>
					<button className="rounded-md border-2 bg-yellow-300 hover:bg-yellow-600 hover:text-white p-2">
						<Link to="/">Yes</Link>
					</button>
				</div>
			</Modal>
		</section>
	);
}
export default FightActions;
