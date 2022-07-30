#!/usr/bin/env node

import chalk from 'chalk';
import { Command } from 'commander';
import { groupTransactionsByUserId } from '../utils';
import fs from 'fs';
import { Currency, GroupedTransactions } from '../types';

async function run() {
  const program = new Command();

  program.argument('<file_path>', 'Path of transactions file').parse();

  const [path] = program.args;

  console.log(`Reading transactions from path: ${path}`);
  fs.readFile(path, 'utf-8', (error, data) => {
    if (error) console.log(chalk.red(error));
    const groupedTransactions: GroupedTransactions = groupTransactionsByUserId(
      JSON.parse(data),
    );
    const tableData = Object.keys(groupedTransactions).map(
      (keyName, keyIndex) => {
        return {
          'User ID': keyName,
          [Currency.GBP]: groupedTransactions[keyName].balances.GBP,
          [Currency.USD]: groupedTransactions[keyName].balances.USD,
          [Currency.EUR]: groupedTransactions[keyName].balances.EUR,
          'Last Activity': groupedTransactions[keyName].last_activity,
        };
      },
    );
    console.table(tableData);
  });
}

run();
