import { Money } from './Money';
import { Currency } from './Currency';
import { ExchangeRatesStorage } from './ExchangeRatesStorage';

export class RatesProvider {
  constructor(private readonly storage = new ExchangeRatesStorage()) {}

  getPriceInEUR(currency: Currency): Money {
    const rateInEUR = this.storage.getRateInEUR(currency);

    return Money.of(rateInEUR, Currency.EUR);
  }
}
