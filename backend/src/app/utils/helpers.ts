import axios from 'axios';
import { randomBytes } from 'crypto';
import envConfig from '../config/env.config';
import { response } from 'express';
import { ConversionResponse, CurrencyConversionResponse, ExchangeRateUSD } from './type';

export function generateTransactionId(): string {
  const timestamp = Date.now().toString(36); // time-based
  const random = randomBytes(10).toString('hex'); // random part
  return `${random}`.toUpperCase();
}

export async function convertToUSD(amount: number, from: string) {
  try {
    const res = await axios.get(
      `https://api.fastforex.io/convert?from=${from}&to=USD&amount=${amount}`,
      {
        headers: {
          Authorization: `Bearer ${envConfig.fastForex.apiKey}`,
        },
      }
    );

    return res.data as ExchangeRateUSD;
  } catch (err: any) {
    console.log(err.response);
    return null;
  }
}

export async function getCurrencyConversionRate(
  from: string,
  to: string,
  amount: number
): Promise<CurrencyConversionResponse | null> {
  if (!from || !to) {
    return null;
  }

  if (!amount || amount <= 0) {
    return null;
  }

  try {
    const res = await axios.get<ConversionResponse>(
      `https://api.exchangerate-api.com/v4/latest/${from}`,
      {
        params: {
          api_key: envConfig.exchange_rate.api_key,
        },
      }
    );

    const rate = res.data.rates[to];
    if (rate == null) {
      return null;
    }

    return {
      currency: to,
      rate,
      convertedAmount: amount * rate,
    };
  } catch (err: any) {
    return null;
  }
}
