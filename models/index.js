const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("tutorial", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

const User = sequelize.define("users", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: "users", timestamps: false, underscored: true });

const Wallet = sequelize.define("wallets", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  currency_type: {
    type: DataTypes.ENUM("THB", "USD", "BTC", "ETH", "XRP", "DOGE"),
    allowNull: false,
  },
  balance: { type: DataTypes.DECIMAL(20, 8), allowNull: false, defaultValue: 0 },
}, { tableName: "wallets", timestamps: false, underscored: true });

const TradeOrder = sequelize.define("trade_orders", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  type: { type: DataTypes.ENUM("buy", "sell"), allowNull: false },
  crypto_type: { type: DataTypes.ENUM("BTC", "ETH", "XRP", "DOGE"), allowNull: false },
  amount: { type: DataTypes.DECIMAL(20, 8), allowNull: false },
  price_per_unit: { type: DataTypes.DECIMAL(20, 2), allowNull: false },
  status: { type: DataTypes.ENUM("open", "completed", "cancelled"), defaultValue: "open" },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: "trade_orders", timestamps: false, underscored: true });

const Transaction = sequelize.define("transactions", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  from_user_id: { type: DataTypes.INTEGER, allowNull: false },
  to_user_id: { type: DataTypes.INTEGER, allowNull: true },
  amount: { type: DataTypes.DECIMAL(20, 8), allowNull: false }, 
  currency_type: { type: DataTypes.ENUM("Fiat", "Crypto"), allowNull: false },
  transaction_type: {
    type: DataTypes.ENUM("deposit", "withdraw", "transfer", "trade"),
    allowNull: false,
  },
  trade_order_id: { type: DataTypes.INTEGER, allowNull: true },
  external_address: { type: DataTypes.STRING, allowNull: true },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: "transactions", timestamps: false, underscored: true });

module.exports = {
  sequelize,
  User,
  Wallet,
  TradeOrder,
  Transaction,
};
