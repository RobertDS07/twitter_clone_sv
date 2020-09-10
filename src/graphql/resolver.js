const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const config = require('../config/config')

const User = require('../models/User')
const Post = require('../models/Post')

const resolvers = {

    posts: async ({ token }) => {
        let idUser = undefined

        const authorization = jwt.verify(token, config.secret, (err, decoded) => {
            if (err) return false

            idUser = decoded.id

            return true
        })

        const posts = await Post.find()

        posts.forEach(post => {
            if (post.authorID === idUser) {
                post.mutable = true
            }
        })

        if (authorization) {
            return posts
        } return new Error('Algo de errado ocorreu')
    },

    createUser: async ({ name, email, password }) => {

        const sameEmailAsAnotherUser = await User.findOne({email})

        if(!!sameEmailAsAnotherUser) return new Error('Este email já esta cadastrado no nosso banco de dados')

        if(password.length < 5) return new Error('Senha deve conter 5 caracteres ou mais')

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

    login: async ({ email, password }) => {
        const user = await User.findOne({ email }).select('+password')

        if (!!user && await bcrypt.compare(password, user.password)) {
            return jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 604800
            })
        } return new Error('As credencias não foram encontradas nos nossos registros')
    },

    createPost: async ({ token, content }) => {
        const id = jwt.verify(token, config.secret, (err, decoded) => {
            if (err) return false

            return decoded.id
        })

        if(!id) return new Error('Algo de errado ocorreu, tente novamente')

        const {name} = await User.findById({_id: id})

        const newPost = {
            authorID: id,
            author: name,
            content
        }

        await Post.create(newPost)

        return 200
    },

    deletePost: async({ _id }) => {
        await Post.findByIdAndDelete({_id})

        return 200
    }
}

module.exports = resolvers