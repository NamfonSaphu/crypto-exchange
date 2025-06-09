const { Transaction, User, TradeOrder } = require('../models');

exports.createTransaction = async (req, res) => {
  try {
    const {
      from_user_id,
      to_user_id,
      amount,
      currency_type,
      transaction_type,
      trade_order_id,
      external_address
    } = req.body;

    const fromUser = await User.findByPk(from_user_id);
    if (!fromUser) return res.status(404).json({ error: 'From user not found' });

    if (to_user_id) {
      const toUser = await User.findByPk(to_user_id);
      if (!toUser) return res.status(404).json({ error: 'To user not found' });
    }

    if (trade_order_id) {
      const tradeOrder = await TradeOrder.findByPk(trade_order_id);
      if (!tradeOrder) return res.status(404).json({ error: 'Trade order not found' });
    }

    const tx = await Transaction.create({
      from_user_id,
      to_user_id,
      amount,
      currency_type,
      transaction_type,
      trade_order_id,
      external_address
    });

    res.status(201).json(tx);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const txs = await Transaction.findAll();
    res.json(txs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTransactionsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const txs = await Transaction.findAll({
      where: {
        from_user_id: userId
      }
    });

    res.json(txs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
