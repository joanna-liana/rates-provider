import { Money } from './Money';
import { Currency } from './Currency';
import { ExchangeRatesStorage } from './ExchangeRatesStorage';

export class RatesProvider {
  constructor(private readonly storage = new ExchangeRatesStorage()) {}

  getPriceInEUR(currency: Currency): Money {
    const rateInEUR = this.storage.getRateInEUR(currency);

    return {
      currency: Currency.EUR,
      amount: rateInEUR,
    };
  }
}
