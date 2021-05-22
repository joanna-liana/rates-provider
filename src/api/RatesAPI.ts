import { Currency } from '../Currency';

export interface RatesAPI {
  getRateInEUR(currency: Currency): Promise<number | undefined>;
}
