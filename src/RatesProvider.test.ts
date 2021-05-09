import { Currency } from './Currency';
import { UnsupportedCurrency } from './errors/UnsupportedCurrency';
import { RatesProvider } from './RatesProvider';

describe('RatesProvider', () => {
  const ratesProvider = new RatesProvider();

  it.each([
    [Currency.USD, 0.82],
    [Currency.PLN, 0.22],
    [Currency.CAD, 0.64],
    [Currency.GBP, 1.1],
  ])(
    'returns the price in EUR for the given currency - %s, %f',
    (currency, rate) => {
      const price = ratesProvider.getPriceInEUR(currency);

      expect(price.currency).toBe(Currency.EUR);
      expect(price.amount).toBe(rate);
    }
  );

  it('throws when provided with an unsupported currency', () => {
    const unsupportedCurrency = 'UNSUPPORTED';

    expect(() =>
      ratesProvider.getPriceInEUR(unsupportedCurrency as never)
    ).toThrowError(new UnsupportedCurrency());
  });
});
