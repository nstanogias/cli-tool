import { Currency, Transaction } from '../types';
import {
  groupTransactionsByUserId,
  isInputValidFormat,
  isTransaction,
} from '../utils';

describe('test util functions', () => {
  it('should return false if object not of type Transaction', () => {
    expect(
      isTransaction({
        user_id: '4a1b84f7-9756-4549-837e-9574c7ffc142',
        timestamp: '1970-01-01T00:00:00.000Z',
        currency: 'GBP',
      }),
    ).toBe(false);
  });

  it('should return false if input not array', () => {
    const input = {
      user_id: '4a1b84f7-9756-4549-837e-9574c7ffc142',
      timestamp: '1970-01-01T00:00:00.000Z',
      currency: 'GBP',
      amount: '+12.00',
    };
    const expectedOutput = { valid: false, msg: 'input should be an array' };
    expect(isInputValidFormat(input)).toStrictEqual(expectedOutput);
  });

  it('should return false if transaction properties are missing', () => {
    const input = [
      {
        timestamp: '1970-01-01T00:00:00.000Z',
        currency: 'GBP',
        amount: '+12.00',
      },
      {
        user_id: '4a1b84f7-9756-4549-837e-9574c7ffc142',
        timestamp: '1970-01-01T00:00:00.000Z',
        currency: 'USD',
        amount: '-12.00',
      },
      {
        user_id: 'faf4a6fe-c839-4ee3-ac11-ee3957ac6332',
        timestamp: '1970-01-01T00:00:00.000Z',
        currency: 'EUR',
        amount: '-3.99',
      },
    ];

    const expectedOutput = {
      valid: false,
      msg: 'invalid input. Transaction properties are missing',
    };
    expect(isInputValidFormat(input)).toStrictEqual(expectedOutput);
  });

  it('should return grouped transactions by user id', () => {
    const input: Transaction[] = [
      {
        user_id: '4a1b84f7-9756-4549-837e-9574c7ffc142',
        timestamp: '1970-01-01T00:00:00.000Z',
        currency: Currency.GBP,
        amount: '+12.00',
      },
      {
        user_id: '4a1b84f7-9756-4549-837e-9574c7ffc142',
        timestamp: '1970-01-01T00:00:00.000Z',
        currency: Currency.USD,
        amount: '-12.00',
      },
      {
        user_id: 'faf4a6fe-c839-4ee3-ac11-ee3957ac6332',
        timestamp: '1970-01-01T00:00:00.000Z',
        currency: Currency.EUR,
        amount: '-3.99',
      },
    ];

    const expectedOutput = {
      '4a1b84f7-9756-4549-837e-9574c7ffc142': {
        balances: { GBP: 12, USD: -12, EUR: 0 },
        last_activity: '1970/01/01',
      },
      'faf4a6fe-c839-4ee3-ac11-ee3957ac6332': {
        balances: { GBP: 0, USD: 0, EUR: -3.99 },
        last_activity: '1970/01/01',
      },
    };
    expect(groupTransactionsByUserId(input)).toStrictEqual(expectedOutput);
  });
});
