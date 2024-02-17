const mongoose = require('mongoose')

const electronicsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [10, "Name needs to be at least 10 characters."]

    },
    type: {
        type: String,
        required: true,
        minLength: [2, "Type needs to be at least 2 characters"]

    },
    damages: {
        type: String,
        required: true,
        minLength: [10, "Damages needs to be at least 10 characters."]


    },

    image: {
        type: String,
        required: true,
        match: /^https?:\/\//


    },
    description: {
        type: String,
        required: true,
        minLength: [10, "Description needs to be at least 10 characters"],
        maxLength: [200, "Description needs to be at least 200 characters"]

    },
    production: {
        type: String,
        required: true,
        min: 1900,
        max: 2023,

    },

    exploitation: {
        type: Number,
        required: true,
        min: [0, "Exploiration needs to be a positive number."]

    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price needs to be a positive number"]

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