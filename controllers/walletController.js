const { Wallet, User } = require('../models');

exports.createWallet = async (req, res) => {
  try {
    const { user_id, currency_type, balance } = req.body;

    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const existingWallet = await Wallet.findOne({
      where: { user_id, currency_type }
    });
    if (existingWallet) {
      return res.status(400).json({ error: 'Wallet for this currency already exists' });
    }

    const wallet = await Wallet.create({ user_id, currency_type, balance });
    res.status(201).json(wallet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getWalletsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const wallets = await Wallet.findAll({
      where: { user_id: userId }
    });

    res.json(wallets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBalance = async (req, res) => {
  try {
    const { walletId } = req.params;
    const { amount } = req.body;

    const wallet = await Wallet.findByPk(walletId);
    if (!wallet) return res.status(404).json({ error: 'Wallet not found' });

    const newBalance = parseFloat(wallet.balance) + parseFloat(amount);
    if (newBalance < 0) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    wallet.balance = newBalance;
    await wallet.save();

    res.json(wallet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteWallet = async (req, res) => {
  try {
    const { walletId } = req.params;

    const wallet = await Wallet.findByPk(walletId);
    if (!wallet) return res.status(404).json({ error: 'Wallet not found' });

    await wallet.destroy();
    res.json({ message: 'Wallet deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
