import { Routes, Route } from 'react-router-dom';
import Lobby from './pages/Lobby';
import Home from './pages/Home';
import Layout from './components/layout/Layout';
import Game from './pages/Game';
import Fight from './pages/Fight';

function App() {

  return (
		<Layout>
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path="/lobby" exact element={<Lobby />} />
				<Route path="/game" exact element={<Game />} />
				<Route path="/fight" exact element={<Fight />} />
			</Routes>
		</Layout>
  )
}

export default App;
