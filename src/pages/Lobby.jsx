import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setDifficultyLevel } from '../redux/pokemonSlice';

function Lobby() {
  const dispatch = useDispatch();

  const onClickDifficulty = (difficulty) => {
    dispatch(setDifficultyLevel(difficulty));
  };

  return (
    <section>
      <div className='p-40 flex flex-col justify-center items-center border-2 rounded-md bg-red-200'>
          <p>Select your difficulty:</p>
          <div className='flex'>   
          <Link to="/game">
            <button onClick={() => onClickDifficulty('easy')} className="btn bg-green-300">Easy</button>
            <button onClick={() => onClickDifficulty('medium')} className="btn bg-yellow-300">Medium</button>
            <button onClick={() => onClickDifficulty('hard')} className="btn bg-red-300">Hard</button>
          </Link>
          </div>
      </div>
      <style>
        {`
        .btn{
          margin: 5px;
          border: 2px solid black;
          border-radius: 5px;
          padding: 10px;
        }`}
      </style>
    </section>
  )
}

export default Lobby;
