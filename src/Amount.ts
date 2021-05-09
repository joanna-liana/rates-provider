import amount from 'currency.js';

export class Amount {
  #amountObject: amount;

  private constructor(value: number | string) {
    this.#amountObject = amount(value, { precision: 10 });
  }

  static of(value: number | string): Amount {
    return new Amount(value);
  }

  get value(): number {
    return this.#amountObject.value;
  }
}
