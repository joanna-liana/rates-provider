import { Currency } from './Currency';
import { UnsupportedCurrency } from './errors/UnsupportedCurrency';
import { InvalidAmount } from './errors/InvalidAmount';
import { Amount } from './Amount';

export class Money {
  private constructor(
    private readonly _amount: Amount,
    private readonly _currency: Currency
  ) {}

  static of(amount: Amount, currency: Currency): Money {
    if (!(amount instanceof Amount)) {
      throw new InvalidAmount();
    }

    if (!Object.values(Currency).includes(currency)) {
      throw new UnsupportedCurrency();
    }

    return new Money(amount, currency);
  }

  get value(): number {
    return this._amount.value;
  }

  get currency(): Currency {
    return this._currency;
  }
}
