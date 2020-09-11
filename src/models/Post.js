const mongoose = require('mongoose')

const comment = mongoose.Schema({
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
    mutable: {
        type: Boolean,
        default: false
    }
})

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
        type: [String],
        default: []
    },
    comments: {
        type: [comment],
        default: []
    },
    mutable: {
        type: Boolean,
        default: false
    }
})

const Post = mongoose.model('posts', PostSchema)

module.exports = Post