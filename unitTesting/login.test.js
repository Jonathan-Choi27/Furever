import React from 'react';
import renderer from 'react-test-renderer';

import Login from "../app/views/login/login.js";
jest.useFakeTimers('modern');


test ('login renders correctly', async () => {
    const tree = renderer.create(<Login />).toJSON();
    expect(tree).toMatchSnapshot();
});