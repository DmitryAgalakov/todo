import { sum } from './JobsView';

test('adding positive numbers is not zero', () => {
  expect(sum(1, 2)).toBe(0);
});
