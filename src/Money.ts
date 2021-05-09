import { Currency } from './Currency';
import Amount from 'currency.js';

import { UnsupportedCurrency } from './errors/UnsupportedCurrency';
import { InvalidAmount } from './errors/InvalidAmount';

export class Money {
  #amountObject: Amount;
  #currency: Currency;

  private constructor(amount: Amount, currency: Currency) {
    this.#amountObject = amount;
    this.#currency = currency;
  }

  static of(value: number | string, currency: Currency): Money {
    if (!Object.values(Currency).includes(currency)) {
      throw new UnsupportedCurrency();
    }

    let amount: Amount;

    try {
      amount = Amount(value, { precision: 10, errorOnInvalid: true });
    } catch {
      throw new InvalidAmount();
    }

    return new Money(amount, currency);
  }

  get value(): number {
    return this.#amountObject.value;
  }

  get currency(): Currency {
    return this.#currency;
  }
}
