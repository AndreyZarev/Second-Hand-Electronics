const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("../lib/jwt")

const { SECRET } = require('../config/secret');

exports.register = async (userData) => {

    const user = await User.findOne({ email: userData.email })

    if (user) {
        throw new Error(`User already exists`);
    }

    if (userData.password !== userData.rePassword) {
        throw new Error("Passwords do not match!");
    }
    User.create(userData)
}

exports.login = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Username or password,is incorrect')
    }

    const isValid = bcrypt.compare(password, user.password)

    if (!isValid) {
        throw new Error('Username or password,is incorrect')
    }


    const loggedUser = {
        _id: user.id,
        email: user.email,
    }

    const token = await jwt.sign(loggedUser, SECRET, { expiresIn: "2h" })

    return token;
}


exports.isCreattor = (req, res, next) => {

};