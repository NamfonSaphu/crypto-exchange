const { TradeOrder, User } = require('../models');

exports.createOrder = async (req, res) => {
  try {
    const { user_id, type, crypto_type, amount, price_per_unit } = req.body;

    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const order = await TradeOrder.create({
      user_id,
      type,
      crypto_type,
      amount,
      price_per_unit,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await TradeOrder.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await TradeOrder.findAll({
      where: { user_id: userId },
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await TradeOrder.findByPk(orderId);
    if (!order) return res.status(404).json({ error: 'Trade order not found' });

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
