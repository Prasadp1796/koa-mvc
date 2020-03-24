const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    "firstName": String,
    "lastName": String,
    "emailId": {type: String, unique: true},
    "contactNumber": {type: String, unique: true},
});

module.exports = mongoose.model('users', userSchema);