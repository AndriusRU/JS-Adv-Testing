export default class Validator {
  constructor() {
    this.sum = 0;
  }

  isValidNumber(cardNumber) {
    const curNumber = cardNumber.trim();
    if (!curNumber) {
      return false;
    }
    this.length = curNumber.length;
    this.even = curNumber.length % 2;
    const digits = Array.from(curNumber).map(Number);
    for (let i = 0; i <= this.length - 2; i += 1) {
      let digit = digits[i];
      if (i % 2 === this.even) {
        digit *= 2;
      }
      if (digit > 9) {
        digit -= 9;
      }
      this.sum += digit;
    }
    this.sum += digits[digits.length - 1];

    if ((this.sum % 10) === 0) {
      return true;
    }
    return false;
  }
}
