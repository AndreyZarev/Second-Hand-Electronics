const Electronics = require('../models/Electronics')

exports.createPost = async function (userId, productData) {

    productData.owner = userId._id;
    await Electronics.create(productData)

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
    const buyingList = await Electronics.findByIdAndUpdate(productId).buyingList.push(userId);
    console.log(buyingList);
}