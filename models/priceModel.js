const mongoose 		 = require("mongoose");

const priceModel = new mongoose.Schema({
	_id: String,
	listPrice: Number,
	formattedList: String,
	currentPrice: Number,
	formattedCurrent: String,
	saveDollar: Number,
	savePercent: String
});
module.exports = mongoose.model('Price', priceModel)