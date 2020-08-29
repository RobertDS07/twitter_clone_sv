const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const config = require('../config/config')

const User = require('../models/User')
const Post = require('../models/Post')

function verifyAuth(token) {
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) return false

        return true
    })
}

const resolvers = {
    posts: (args) => {
        const { token } = args

        verifyAuth(token)

        return Post.find()
    },

    createUser: async (args) => {
        const { name, email, password } = args

        const newUser = {
            name,
            email,
            password
        }

        const user = await User.create(newUser)

        return jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 604800
        })
    },

    login: async (args) => {
        const { email, password } = args

        const user = await User.findOne({ email }).select('+password')

        if (!!user && await bcrypt.compare(password, user.password)) {
            return jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 604800
            })
        } return 401
    },

    createPost: async (args) => {
        const { authorID, author, content } = args

        const id = jwt.verify(authorID, config.secret, (err, decoded) => {
            if (err) return null

            return decoded.id
        })

        const newPost = {
            authorID: id,
            author,
            content
        }

        return await Post.create(newPost)
    }
}

module.exports = resolvers