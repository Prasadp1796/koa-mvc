const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    "first_name": String,
    "last_name": String,
    "email": {type: String, unique: true},
    "contact": {type: String, unique: true},
    "password": String
});

module.exports = mongoose.model('users', userSchema);