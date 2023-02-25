import React from 'react';

const PokemonCard = ({
	enemyPokemon,
	myPokemon,
	enemyHealth,
}) => {
	return (
			<div className="bg-red-200 py-8 px-2">
				<div className="flex flex-col items-end mx-10">
					<p className="font-bold">Enemy Pokemon:</p>
					<h3>
						{enemyPokemon ? (
							<div>
								<img
									src={enemyPokemon.sprites.front_default}
									alt="image of my pokemon"
								></img>
								<p className="font-bold">{enemyPokemon.name}</p>
							</div>
						) : (
							'Loading...'
						)}
					</h3>
					<p>{`Health: ${enemyHealth}/${
						enemyPokemon
							? enemyPokemon.stats.reduce(
									(acc, stat) => acc + stat.base_stat,
									0
							  )
							: ''
					}`}</p>
				</div>
				<div className="p-4 rounded-xl border-2 m-auto w-1/4 text-center bg-red-50">
					<p className="font-extrabold">VS</p>
				</div>
				<div className="flex flex-col items-start mx-10">
					<p className="font-bold">My Pokemon:</p>
					<h3>
						{myPokemon ? (
							<div>
								<img
									src={myPokemon.sprites.back_default}
									alt="image of my pokemon"
								></img>
								<p className="font-bold">{myPokemon.name}</p>
							</div>
						) : (
							'Loading...'
						)}
					</h3>
				</div>
			</div>
	);
};

export default PokemonCard;
