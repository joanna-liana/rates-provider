import { RatesAPI } from '../api/RatesAPI';

export class RatesApiMock implements RatesAPI {
  #getRateCallsCount = 0;

  async getRateInEUR(): Promise<number> {
    this.#getRateCallsCount += 1;

    return 1;
  }

  get getRateCallsCount(): number {
    return this.#getRateCallsCount;
  }
}
