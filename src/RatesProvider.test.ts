import { mock, MockProxy } from 'jest-mock-extended';

import { InMemoryRatesAPI } from './api/InMemoryRatesAPI';
import { RatesAPI } from './api/RatesAPI';
import { Currency } from './Currency';
import { UnsupportedCurrency } from './errors/UnsupportedCurrency';
import { RatesProvider } from './RatesProvider';
import { RatesApiMock } from './test/RatesApiMock';

describe('RatesProvider', () => {
  describe('Core suite', () => {
    const ratesProvider = new RatesProvider(new InMemoryRatesAPI());

    it.each([
      [Currency.USD, 0.82],
      [Currency.PLN, 0.22],
      [Currency.CAD, 0.64],
      [Currency.GBP, 1.1],
    ])(
      'returns the price in EUR for the given currency - %s, %f',
      async (currency, rate) => {
        const price = await ratesProvider.getPriceInEUR(currency);

        expect(price.currency).toBe(Currency.EUR);
        expect(price.value).toBe(rate);
      }
    );

    it('throws when provided with an unsupported currency', async () => {
      const unsupportedCurrency = 'UNSUPPORTED';

      await expect(() => ratesProvider.getPriceInEUR(unsupportedCurrency as never)).rejects
        .toThrowError(new UnsupportedCurrency());
    });
  });

  describe('Mocks and stubs', () => {
    it('Returns the price fetched from the API (manual stub)', async() => {
      // given
      const expectedRate = 1.25;
      const ratesApiStub: RatesAPI = {
        getRateInEUR: () => Promise.resolve(expectedRate)
      };

      const ratesProvider = new RatesProvider(ratesApiStub);

      // when
      const rate = await ratesProvider.getPriceInEUR(Currency.CAD);

      // then
      expect(rate.value).toBe(expectedRate);
    });

    it('Returns the price fetched from the API (jest stub)', async() => {
      // given
      const expectedRate = 1.25;
      const ratesApiStub: MockProxy<RatesAPI> = mock<RatesAPI>();
      ratesApiStub.getRateInEUR.mockResolvedValue(expectedRate);

      const ratesProvider = new RatesProvider(ratesApiStub);

      // when
      const rate = await ratesProvider.getPriceInEUR(Currency.CAD);

      // then
      expect(rate.value).toBe(expectedRate);
    });

    it('Rate fetch requires a single API call (manual mock)', async() => {
      // given
      const ratesApiMock = new RatesApiMock();

      const ratesProvider = new RatesProvider(ratesApiMock);

      // when
      await ratesProvider.getPriceInEUR(Currency.CAD);

      // then
      expect(ratesApiMock.getRateCallsCount).toBe(1);
    });

    it('Rate fetch requires a single API call (jest mock)', async() => {
      // given
      const ratesApiMock: MockProxy<RatesAPI> = mock<RatesAPI>();
      ratesApiMock.getRateInEUR.mockResolvedValue(1.2);

      const ratesProvider = new RatesProvider(ratesApiMock);

      // when
      await ratesProvider.getPriceInEUR(Currency.CAD);

      // then
      expect(ratesApiMock.getRateInEUR).toHaveBeenCalledTimes(1);
    });
  });
});
