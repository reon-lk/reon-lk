var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

var signup = new mongoose.model('signup', schema);

module.exports = signup;