const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: [3, "Username must be at least 3 characters!"]

    },
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,

    }
})


// · The email is required and should be at least 10 characters long.

// · The password is required and should be at least 4 characters long.

// · The repeat password is required and should be equal to the password.
const User = mongoose.model('User', userSchema)


userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 12)
    console.log(hash);
    this.password = hash
})
module.exports = User