const Cart = require('../models/cart.model');

module.exports.history = async (req, res) => {
    const _id = req.params.id;

    const listCart = await Cart.find({idUser: _id});

    res.json(listCart);
}