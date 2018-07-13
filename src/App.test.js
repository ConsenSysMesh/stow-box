import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  // TODO: fix with default props
  ReactDOM.render(<App authenticate={console.log} />, div);
});
