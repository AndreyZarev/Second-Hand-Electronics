const Electronics = require('../models/Electronics')
const User = require('../models/User')
exports.createPost = async function (userId, productData) {


    productData.owner = userId._id;
    await Electronics.create(productData)

    // await Electronics.findByIdAndUpdate(productId, { $push: { owner: userId } })
}


exports.getAllPosts = () => {
    const allPosts = Electronics.find()
    return allPosts
}

exports.getCreator = (productId) => {
    const post = Electronics.findById(productId)

    return post;

}


exports.getProduct = (productId) => {
    const product = Electronics.findById(productId).populate('owner');

    return product;
};

exports.buy = async (userId, productId) => {
    await Electronics.findByIdAndUpdate(productId, { $push: { buyingList: userId } }, { runValidators: true })


}

exports.isBought = (userId, productId) => {
    const porductCreatorId = Electronics.findById(productId).populate("owner")

    return porductCreatorId
}

exports.deleteProduct = async (productId) => {
    await Electronics.findByIdAndDelete(productId)
}

exports.updateProduct = async (productId, body) => {

    await Electronics.findByIdAndUpdate(productId, body, { runValidators: true })
}

exports.search = (name, type) => {
    let query = {}

    if (name) {
        query.name = new RegExp(name, 'i');
    }

    if (type) {
        query.type = type.toLowerCase();
    }
    return Electronics.find(query)

}