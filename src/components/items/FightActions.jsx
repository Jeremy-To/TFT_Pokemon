import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEnemyPkmId } from '../../redux/pokemonSlice';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

function FightActions() {
  const myPkmId = useSelector((state) => state.pokemon.myPkmId);
  const enemyPkmId = useSelector((state) => state.pokemon.enemyPkmId);
  const dispatch = useDispatch();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [myPokemon, setMyPokemon] = useState(null);
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [enemyHealth, setEnemyHealth] = useState(0);

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
          setEnemyHealth(data.stats.reduce((acc, stat) => acc + stat.base_stat, 0));
        })
        .catch((error) => console.log(error));
    }
  }, [enemyPkmId]);

  const handleAttack = () => {
    const myAttack = myPokemon.stats.find((stat) => stat.stat.name === 'attack').base_stat;
    const mySpecialAttack = myPokemon.stats.find((stat) => stat.stat.name === 'special-attack').base_stat;
    const enemyDefense = enemyPokemon.stats.find((stat) => stat.stat.name === 'defense').base_stat;
    const enemySpecialDefense = enemyPokemon.stats.find((stat) => stat.stat.name === 'special-defense').base_stat;

    const damage = Math.round(((myAttack + mySpecialAttack) * 2) - (enemyDefense + enemySpecialDefense));

    if (damage >= enemyHealth) {
      setEnemyHealth(0);
      setModalIsOpen(true);
      dispatch(setEnemyPkmId(null));
    } else {
      setEnemyHealth(enemyHealth - damage);
    }
  };
  return (
    <div>
      <div>
        <p>Enemy Pokemon:</p>
        <h3>{enemyPokemon ? <div><img src={enemyPokemon.sprites.front_default} alt="image of my pokemon"></img><p>{enemyPokemon.name}</p></div>: 'Loading...'}</h3>
        <p>My Pokemon:</p>
        <h3>{myPokemon ? <div><img src={myPokemon.sprites.front_default} alt="image of my pokemon"></img><p>{myPokemon.name}</p></div>: 'Loading...'}</h3>
        <p>{`Health: ${enemyHealth}/${enemyPokemon ? enemyPokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0) : ''}`}</p>
        <button onClick={handleAttack}>Attack</button>
      </div>
      <Modal isOpen={modalIsOpen}>
        <p>Enemy Pokemon fainted! Thanks for playing! Want to play again?</p>
        <Link to="/">Yes</Link>
      </Modal>
    </div>
  );
}

export default FightActions;
