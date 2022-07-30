import { GroupedTransactions, Transaction } from '../types';
import moment from 'moment';
import 'moment/locale/en-gb';

moment.locale('en-gb');

export const isInputValidFormat = (
  data: unknown[],
): { valid: boolean; msg: string } => {
  if (!Array.isArray(data)) {
    return { valid: false, msg: 'input should be an array' };
  }
  // data.forEach((elem) => {
  //   if elem
  // })
  return { valid: true, msg: 'all good!' };
};

export const groupTransactionsByUserId = (
  transactions: Transaction[],
): GroupedTransactions => {
  console.log(transactions);
  const res = transactions.reduce((acc, curr) => {
    const key = curr.user_id;
    if (!acc[key]) {
      const balances = {
        GBP: 0,
        USD: 0,
        EUR: 0,
      };
      balances[curr.currency] = balances[curr.currency] + +curr.amount;
      acc[key] = {
        balances,
        last_activity: moment(curr.timestamp).format('YYYY/MM/DD'),
      };
    } else {
      const newBalances = { ...acc[key].balances };
      newBalances[curr.currency] = newBalances[curr.currency] + +curr.amount;
      acc[key] = {
        balances: newBalances,
        last_activity: moment(curr.timestamp).format('YYYY/MM/DD'),
      };
    }
    return acc;
  }, {});
  return res;
};
