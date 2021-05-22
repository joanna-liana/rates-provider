import Amount from 'currency.js';
import cloneDeep from 'lodash.clonedeep';

import { Currency } from './Currency';
import { InvalidAmount } from './errors/InvalidAmount';
import { UnsupportedCurrency } from './errors/UnsupportedCurrency';

interface CurrencyProps {
  symbol: string;
  separator?: string;
  decimal?: string;
  pattern?: string;
}

export class Money {
  #amountObject: Amount;
  #currency: Currency;

  private static currencyPropsMap: { [key in Currency]: CurrencyProps } = {
    [Currency.CAD]: {
      symbol: '$',
    },
    [Currency.USD]: {
      symbol: '$',
    },
    [Currency.GBP]: {
      symbol: '£',
    },
    [Currency.EUR]: {
      symbol: '€',
    },
    [Currency.PLN]: {
      symbol: 'zł',
      decimal: ',',
      separator: '.',
      pattern: '# !',
    },
  };

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
      amount = Amount(value, {
        precision: 10,
        errorOnInvalid: true,
        ...this.currencyPropsMap[currency],
      });
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

  toString(precision = 2): string {
    const amountCopy = cloneDeep(this.#amountObject);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (amountCopy as any).s.precision = precision;

    const str = amountCopy.format();

    return str;
  }
}
