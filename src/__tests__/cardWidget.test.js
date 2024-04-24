import CardWidget from '../js/cardWidget';
// import { log } from 'console';

test('widget render', () => {
  document.body.innerHTML = '<div class="container"></div>';

  const container = document.querySelector('.container');
  const cardWidget = new CardWidget(container);
  cardWidget.bindToDOM();

  expect(container.innerHTML).toEqual(CardWidget.markup);
});

test('valid class to card', () => {
  document.body.innerHTML = '<div class="container"></div>';

  const container = document.querySelector('.container');
  const cardWidget = new CardWidget(container);
  cardWidget.bindToDOM();

  cardWidget.input.value = '4512345616781235';
  cardWidget.onInput();

  expect(document.querySelector('.visa').classList.contains('hidden')).toEqual(false);
});

test('invalid class to card', () => {
  document.body.innerHTML = '<div class="container"></div>';

  const container = document.querySelector('.container');
  const cardWidget = new CardWidget(container);
  cardWidget.bindToDOM();

  cardWidget.input.value = '4512345616781235';
  cardWidget.onInput();

  expect(document.querySelector('.visa-electron').classList.contains('hidden')).toEqual(true);
});
