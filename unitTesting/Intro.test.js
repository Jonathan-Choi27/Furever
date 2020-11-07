// __tests__/Intro-test.js
import React from 'react';
import Intro from '../app/views/petTab/buy/Intro';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Intro />).toJSON();
  expect(tree).toMatchSnapshot();
});