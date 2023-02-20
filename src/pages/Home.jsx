import React from 'react'
import { Link } from 'react-router-dom';

function Home() {
  return (
  <>
    <div className='p-40 flex justify-center items-center border-2 rounded-md bg-red-200 '> 
      <div className=' bg-blue-400 hover:bg-blue-800 hover:text-white px-4 py-2 rounded-md'>
        <Link to="/lobby">Play</Link>
      </div>
    </div>
  </>
  )
}

export default Home