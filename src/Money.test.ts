import { Currency } from './Currency';
import { UnsupportedCurrency } from './errors/UnsupportedCurrency';
import { Money } from './Money';

describe('Money', () => {
  describe('Create', () => {
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

  describe('Printing', () => {
    it.each([
      [Currency.CAD, '$1,000.50'],
      [Currency.EUR, '€1,000.50'],
      [Currency.USD, '$1,000.50'],
      [Currency.GBP, '£1,000.50'],
      [Currency.PLN, '1.000,50 zł'],
    ])(
      'prints a localised string - %s as %s',
      async (currency, expectedString) => {
        // given
        const money = Money.of(1000.5, currency);

        // when
        const description = money.toString();

        // then
        expect(description).toBe(expectedString);
      }
    );

    it.each([
      [0.5, '$0.50'],
      [1.5, '$1.50'],
      [2.567, '$2.57'],
      [560.19999999, '$560.20'],
      [-13.1, '-$13.10'],
      [0.0, '$0.00'],
    ])(
      'the localised string has 2 decimal places by default',
      async (value, expectedString) => {
        // given
        const money = Money.of(value, Currency.USD);

        // when
        const description = money.toString();

        // then
        expect(description).toBe(expectedString);
      }
    );

    it.each([
      [0, 0.49, '$0'],
      [0, 0.6, '$1'],
      [1, 0.5, '$0.5'],
      [3, 1.5, '$1.500'],
      [6, 560.1999999, '$560.200000'],
      [7, 560.1999999, '$560.1999999'],
      [20, 0.0, '$0.00000000000000000000'],
    ])(
      'prints a localised string with custom precision - from 0 up to 20 - %',
      async (precision, value, expectedString) => {
        // given
        const money = Money.of(value, Currency.USD);

        // when
        const description = money.toString(precision);

        // then
        expect(description).toBe(expectedString);
      }
    );
  });
});
