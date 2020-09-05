const mongoose = require ('mongoose');


const userSchema = new mongoose.Schema({
	id: String,
	name: String,
	email: String,
    password: String,
    phone: Number,
	add: String,
	update: {type: Date, default: Date.now}
})

const User = mongoose.model('User', userSchema, 'users');
module.exports = User;