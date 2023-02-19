import { Routes, Route } from 'react-router-dom';

import PokemonDetails from './components/PokemonDetails';
import PokemonList from './components/PokemonList';
import PokemonSprite from './components/Sprite';

function App() {

  return (
			<Routes>
				<Route path="/detail" exact element={<PokemonDetails />} />
				<Route path="/list" exact element={<PokemonList />} />
				<Route path="/sprite" exact element={<PokemonSprite />} />
			</Routes>
  )
}

export default App
