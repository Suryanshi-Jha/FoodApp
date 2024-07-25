const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
    email: String,
    orderData: Array // Define the structure of your order data
});

module.exports = mongoose.model('Email', EmailSchema);
