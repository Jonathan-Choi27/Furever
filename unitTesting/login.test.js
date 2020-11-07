import React from 'react';
import renderer from 'react-test-renderer';

import Login from "../app/views/login/login.js";
// jest.useFakeTimers('modern');
jest.useFakeTimers();


// test ('login renders correctly', async () => {
//     jest.useFakeTimers()
//     const tree = renderer.create(Login).toJSON();
//     expect(tree).toMatchSnapshot();
// });

// describe('Test', () => {
//     it('render success', () => {
//         const wrapper = shallow(Login,
//            { context: {store: mockStore(initialState) }}
//            ),
//            expect(wrapper.drive().toMatchSnapshot);
//         });
// })

test('renders correctly', () => {
    const tree = renderer.create(<Login />).toJSON();
    expect(tree).toMatchSnapshot();
  });