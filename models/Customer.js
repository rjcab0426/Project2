var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    gender: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
});

module.exports = mongoose.model('Customers', CustomerSchema);