import Validator from '../js/Validator';

test('empty number', () => {
  const valid = new Validator();
  const result = valid.isValidNumber('');
  expect(result).toBe(false);
});

test('number not number', () => {
  const valid = new Validator();
  const result = valid.isValidNumber('asd45asd324asd');
  expect(result).toBe(false);
});

test('not valid number', () => {
  const valid = new Validator();
  const result = valid.isValidNumber('4512345616781234');
  expect(result).toBe(false);
});

test('valid number', () => {
  const valid = new Validator();
  const result = valid.isValidNumber('4512345616781235');
  expect(result).toBe(true);
});
