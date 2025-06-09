const express = require('express');
const { sequelize } = require('./models');

const userRoutes = require('./routes/userRoutes');
const walletRoutes = require('./routes/walletRoutes');
const tradeOrderRoutes = require('./routes/tradeOrderRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/wallets', walletRoutes);
app.use('/api/trade-orders', tradeOrderRoutes);
app.use('/api/transactions', transactionRoutes);

const PORT = 8000;

app.listen(PORT, async () => {
  try {
    await sequelize.sync();
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
});
