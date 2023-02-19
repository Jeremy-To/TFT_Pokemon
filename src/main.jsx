import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // import Provider
import store from './redux/store'; // import your Redux store
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> {/* wrap App with Provider */}
    <BrowserRouter>
			<App />
		</BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
