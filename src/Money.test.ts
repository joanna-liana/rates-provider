import { Currency } from './Currency';
import { UnsupportedCurrency } from './errors/UnsupportedCurrency';
import { Money } from './Money';

describe('Money', () => {
  it('creates a valid instance', async () => {
    // given, when
    const money = Money.of(100, Currency.USD);

    // then
    expect(money.value).toBe(100);
    expect(money.currency).toBe(Currency.USD);
  });

  it.each(Object.values(Currency))(
    'creates Money in different currencies - %s',
    async (currency) => {
      // given, when
      const money = Money.of(100, currency);

      // then
      expect(money.value).toBe(100);
      expect(money.currency).toBe(currency);
    }
  );

  it('throws when the provided currency is unsupported', async () => {
    expect(() => Money.of(10, 'INVALID' as never)).toThrowError(
      new UnsupportedCurrency()
    );
  });

  it.each([0, 0.1, 1.567, -7.34596])(
    'creates Money with the precise amount passed as a number - %f',
    async (amount) => {
      // given, when
      const money = Money.of(amount, Currency.CAD);

      // then
      expect(money.value).toBe(amount);
    }
  );

  it.each([
    ['0.0', 0],
    ['0.1', 0.1],
    ['125.67', 125.67],
    ['-7.34596', -7.34596],
  ])(
    'creates Money with the precise amount passed as a string - %s',
    async (stringified, expectedAmount) => {
      // given, when
      const money = Money.of(stringified, Currency.GBP);

      // then
      expect(money.value).toBe(expectedAmount);
      expect(money.currency).toBe(Currency.GBP);
    }
  );
});
