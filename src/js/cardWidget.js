import cards from '../data/cards.json';
import Validator from './Validator';

export default class CardWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.onSubmit = this.onSubmit.bind(this);
    this.onInput = this.onInput.bind(this);
  }

  static get markup() {
    return `
      <form class="card-widget">
        <label for="card-number">Your Card number</label>
        ${CardWidget.genCardPicture(Object(cards))}
        <div class="check-card">
          <input type="text" id="card-number" class="input">
          <button class="submit button">Click to Validate</button>
        </div>
      </form>
    `;
  }

  static genCardPicture(listCards) {
    const cardsHtml = listCards.map((item) => `<li><span class="card ${item.key}">${item.bank}</span></li>`).join('');
    const resultHtml = `<ul class="cards-list">${cardsHtml}</ul>`;
    return resultHtml;
  }

  static get submitSelector() {
    return '.submit';
  }

  static get inputSelector() {
    return '.input';
  }

  static get selector() {
    return '.card-widget';
  }

  bindToDOM() {
    this.parentEl.innerHTML = CardWidget.markup;

    this.element = this.parentEl.querySelector(CardWidget.selector);
    this.submit = this.element.querySelector(CardWidget.submitSelector);
    this.input = this.element.querySelector(CardWidget.inputSelector);

    this.element.addEventListener('submit', this.onSubmit);
    this.element.addEventListener('keyup', this.onInput);
  }

  onSubmit(event) {
    event.preventDefault();
    const cardNumber = this.input.value;
    const valid = new Validator();
    this.cardInputValid(valid.isValidNumber(cardNumber));
  }

  cardInputValid(isValid) {
    if (isValid) {
      this.input.classList.remove('invalid');
      this.input.classList.add('valid');
    } else {
      this.input.classList.remove('valid');
      this.input.classList.add('invalid');
    }
  }

  onInput() {
    this.input.classList.remove('invalid');
    this.input.classList.remove('valid');

    const cardNumber = this.input.value;

    const systemPay = CardWidget.getSystemPay(cardNumber);
    this.showSystemLogo(systemPay);
  }

  static getSystemPay(cardNumber) {
    const availCardSystem = [];
    Object(cards).forEach((element) => {
      const exp = new RegExp(element.regexp);
      const allowLengthStart = element.len[0];
      const allowLengthEnd = element.len[element.len.length - 1];

      if (exp.test(cardNumber) && this.checkLength(cardNumber, allowLengthStart, allowLengthEnd)) {
        availCardSystem.push(element.key);
      }
    });
    return availCardSystem;
  }

  static checkLength(card, start, end) {
    return (card.length >= start && card.length <= end);
  }

  showSystemLogo(systemKey) {
    const cardsDOM = this.element.querySelectorAll('.card');
    if (!systemKey || !systemKey.length) {
      cardsDOM.forEach((card) => {
        card.classList.remove('hidden');
      });
      return;
    }

    if (systemKey.length) {
      cardsDOM.forEach((card) => {
        const isExist = Array.from(card.classList).filter((elem) => systemKey.includes(elem));
        if (Object.keys(isExist).length === 0) {
          card.classList.add('hidden');
        }
      });
    }
  }
}
