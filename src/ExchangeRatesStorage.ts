import { Currency } from './Currency';
import { UnsupportedCurrency } from './errors/UnsupportedCurrency';

export class ExchangeRatesStorage {
  private exchangeRatesInEUR = new Map<Currency, number>([
    [Currency.USD, 0.82],
    [Currency.PLN, 0.22],
    [Currency.CAD, 0.64],
    [Currency.GBP, 1.1],
  ]);

  getRateInEUR(currency: Currency) {
    const rate = this.exchangeRatesInEUR.get(currency);

    if (!rate) {
      throw new UnsupportedCurrency();
    }

    return rate;
  }
}
