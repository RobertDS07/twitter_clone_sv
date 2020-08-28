const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    authorID: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    content: {
        type: String, 
        required: true
    },
    likes: {
        type: Number,
        default: 0
    }
})

const Post = mongoose.model('posts', PostSchema)

module.exports = Post