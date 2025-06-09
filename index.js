const { sequelize, User, Wallet, TradeOrder, Transaction } = require('./models');

async function startApp() {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');

    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');

    console.log('Ready to use models like User, Wallet, etc.');

    const users = await User.findAll();
    console.log(`Found ${users.length} users.`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    // await sequelize.close();
  }
}

startApp();
