const mongoose = require('mongoose')

const electronicsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    type: {
        type: String,
        required: true,

    },
    damages: {
        type: String,
        required: true,

    },

    image: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,

    },
    production: {
        type: String,
        required: true,

    },

    exploitation: {
        type: Number,
        required: true,

    },
    price: {
        type: Number,
        required: true,

    },
    buyingList: {
        type: [],
        required: true,

    },

    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
})

const Electronics = mongoose.model('Electronics', electronicsSchema)


module.exports = Electronics










// ·  – an array of objects containing the users' ID



// Note: When a user buy electronic, their ID is added to that collection (buyingList)

// Implement the entities with the correct data types.