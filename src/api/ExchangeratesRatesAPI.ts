import axios from 'axios';
import { config } from 'dotenv';
import ulrjoin from 'url-join';

import { Currency } from '../Currency';
import { RatesAPI } from './RatesAPI';

config();

export class ExchangeratesRatesAPI implements RatesAPI {
  #baseURL = 'http://api.exchangeratesapi.io/v1/';
  #apiKey = process.env.EXCHANGERATES_API_KEY;

  async getRateInEUR(currency: Currency): Promise<number | undefined> {
    const url = ulrjoin(this.#baseURL, 'latest', `?access_key=${this.#apiKey}`);
    const rateResponse = await axios.get(url);

    return rateResponse.data?.rates[currency];
  }
}
