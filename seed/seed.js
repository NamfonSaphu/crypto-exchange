const { sequelize, User, Wallet, TradeOrder, Transaction } = require('../models');

const seed = async () => {
  await sequelize.sync({ force: true });

  const user1 = await User.create({
    name: "Satoshi Nakamoto",
    email: "satoshi@bitcoin.org",
    password: "btcgenius",
  });

  const user2 = await User.create({
    name: "Vitalik Buterin",
    email: "vitalik@ethereum.org",
    password: "ethgenius",
  });

  await Wallet.bulkCreate([
    { user_id: user1.id, currency_type: 'BTC', balance: 2.5 },
    { user_id: user1.id, currency_type: 'THB', balance: 150000 },
    { user_id: user2.id, currency_type: 'ETH', balance: 10 },
    { user_id: user2.id, currency_type: 'USD', balance: 5000 },
  ]);

  await TradeOrder.bulkCreate([
    {
      user_id: user1.id,
      type: 'buy',
      crypto_type: 'ETH',
      amount: 2,
      price_per_unit: 90000,
      status: 'open',
    },
    {
      user_id: user2.id,
      type: 'sell',
      crypto_type: 'ETH',
      amount: 2,
      price_per_unit: 90000,
      status: 'open',
    },
  ]);

  await Transaction.bulkCreate([
    {
      from_user_id: user1.id,
      to_user_id: user2.id,
      amount: 2,
      currency_type: 'Fiat',
      transaction_type: 'trade',
      trade_order_id: 1,
      external_address: null,
    },
    {
      from_user_id: user2.id,
      to_user_id: user1.id,
      amount: 2,
      currency_type: 'Crypto',
      transaction_type: 'trade',
      trade_order_id: 2,
      external_address: null,
    },
    {
      from_user_id: user1.id,
      to_user_id: null,
      amount: 5000,
      currency_type: 'Fiat',
      transaction_type: 'withdraw',
      external_address: 'bank://123-456-789',
    },
  ]);

  console.log("Seed data inserted with new test values.");
  process.exit();
};

seed();
