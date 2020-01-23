const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: [true, 'Please add a name']
      },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Please add a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    }
});

module.exports = mongoose.model('Users', UserSchema);