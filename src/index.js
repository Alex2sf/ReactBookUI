import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Books from './books'

import 'bootstrap/dist/css/bootstrap.min.css'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Books />
  </React.StrictMode>
);
