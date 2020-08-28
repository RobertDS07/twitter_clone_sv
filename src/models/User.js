const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    }
})

UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

const User = mongoose.model('Users', UserSchema)

module.exports = User