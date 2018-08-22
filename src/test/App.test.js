import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  // TODO: fix with default props
  ReactDOM.render(<App authenticate={console.log} />, div);
});

it('renders correctly', () => {
  const tree = renderer
     .create(<App authenticate={console.log} />)
     .toJSON();
  expect(tree).toMatchSnapshot();
});