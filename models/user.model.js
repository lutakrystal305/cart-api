const mongoose = require ('mongoose');


const userSchema = new mongoose.Schema({
	id: String,
	name: String,
	email: String,
    password: String,
	phone: Number,
	date: String,
	uni: String,
	add: String,
	urlAvt: String,
	userID: String,
	rate: Object,
	update: {type: Date, default: Date.now}
})

const User = mongoose.model('User', userSchema, 'users');
module.exports = User;