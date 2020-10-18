var mongoose= require('mongoose');
var cartSchema = new mongoose.Schema({
    idUser: mongoose.Types.ObjectId,
    name: String,
	items: Array,
	total: String,
	phone: Number,
    add: String,
    email: String,
    date: {type: Date, default: Date.now}
});

var Cart = mongoose.model('Cart', cartSchema, 'carts');

module.exports = Cart;