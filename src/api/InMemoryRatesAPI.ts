import { Currency } from '../Currency';
import { RatesAPI } from './RatesAPI';

export class InMemoryRatesAPI implements RatesAPI {
  private exchangeRatesInEUR = new Map<Currency, number>([
    [Currency.USD, 0.82],
    [Currency.PLN, 0.22],
    [Currency.CAD, 0.64],
    [Currency.GBP, 1.1],
  ]);

  async getRateInEUR(currency: Currency): Promise<number | undefined> {
    return this.exchangeRatesInEUR.get(currency);
  }
}
