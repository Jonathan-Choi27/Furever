import sum from "../app/views/petTab/buy/petCategories";

jest.useFakeTimers();

// test('renders correctly', () => {
//   jest.useFakeTimers();

//   const tree = renderer.create(<HomeListing/>).toJSON();
//   expect(tree).toMatchSnapshot();
// });
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});