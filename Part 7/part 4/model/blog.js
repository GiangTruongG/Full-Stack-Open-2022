const mongoose = require('mongoose');
const { MONGODB_URI } = require('../utils/config');

mongoose.connect(MONGODB_URI);

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    comments: Array,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

blogSchema.set('strictPopulate', false);

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog
