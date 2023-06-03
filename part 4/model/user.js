const mongoose = require('mongoose');
const { MONGODB_URI } = require('../utils/config');

mongoose.connect(MONGODB_URI);

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    passwordHash: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
});

userSchema.set('strictPopulate', false);

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User
