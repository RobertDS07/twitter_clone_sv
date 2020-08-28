const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const config = require('../config/authSecret')

const resolvers = {
    hello: User.find(),

    createUser: async (args) => {
        const { name, email, password } = args

        const newUser = {
            name,
            email,
            password
        }

        const user = await User.create(newUser)

        return jwt.sign({id: user._id}, config.secret, {
            expiresIn: 604800
        })
    },

    login: async (args) => {
        const { email, password } = args

        const user = await User.findOne({ email }).select('+password')

        if (!!user && await bcrypt.compare(password, user.password)) {
            return jwt.sign({id: user._id}, config.secret, {
                expiresIn: 604800
            })
        } return 401
    }
}

module.exports = resolvers