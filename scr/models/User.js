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
        minLength: [10, "The email is required and should be at least 10 characters long."]

    },
    password: {
        type: String,
        required: true,
        minLength: [4, "The password is required and should be at least"]

    }
})



const User = mongoose.model('User', userSchema)

// userSchema.pre('save', function (next) {
//     if (!this.username || !this.email || !this.password) {
//         next(new Error('Name and email are required'));
//     } else {
//         next();
//     }
// });

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 12)
    console.log(hash);
    this.password = hash
})
module.exports = User