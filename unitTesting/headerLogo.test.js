// __tests__/Intro-test.js
import React from 'react';
import HeaderLogo from '../app/views/home/headerLogo';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<HeaderLogo/>).toJSON();
  expect(tree).toMatchSnapshot();
});