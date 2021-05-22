import { RatesAPI } from './api/RatesAPI';
import { Currency } from './Currency';
import { UnsupportedCurrency } from './errors/UnsupportedCurrency';
import { Money } from './Money';

export class RatesProvider {
  constructor(private readonly storage: RatesAPI) {}

  async getPriceInEUR(currency: Currency): Promise<Money> {
    const rateInEUR = await this.storage.getRateInEUR(currency);

    if (!rateInEUR) {
      throw new UnsupportedCurrency();
    }

    return Money.of(rateInEUR, Currency.EUR);
  }
}
