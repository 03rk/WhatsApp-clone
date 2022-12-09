import React from 'react';
import ReactDOM from 'react-dom/client';
import reducer, { initialState } from './Reducer';
import { StateProvider } from './StateProvider';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer ={reducer}>
    <App />
    </StateProvider>
  </React.StrictMode>
);


