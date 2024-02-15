const router = require('express').Router();
const { isAuth } = require('../middleware/authMiddleware')
const createService = require('../services/createService');

router.get('/', (req, res) => {

    res.render("home")
})

router.get("/create", isAuth, (req, res) => {

    res.render("create")

})


router.post('/create', isAuth, async (req, res) => {
    const productData = req.body
    const userId = req.user

    try {
        const userInfo = await createService.createPost(userId, productData)

        res.redirect("/catalog")

    }
    catch (err) {
        res.render("create", { message: err.message })
    }

});




router.get('/catalog', async (req, res) => {
    const [...allPosts] = await createService.getAllPosts().lean()

    res.render("catalog", { allPosts })


});


router.get('/search', (req, res) => {
    res.render("search")
});

router.post('/search', (req, res) => {
});

router.get("/products/:productId/details", async (req, res) => {

    const productId = req.params.productId
    const product = await createService.getProduct(productId).lean()
    const isCreator = product.owner?.email === req.user.email
    let isLoggedIn;
    if (req.user.email) { isLoggedIn = true } else { isLoggedIn = false }


    // const isCreator = await createService.getCreator(req.params)
    res.render("details", { product, isCreator, isLoggedIn })
})

router.get('/:productId/buy', async (req, res) => {
    const userId = req.user._id
    try {
        await createService.buy(userId, req.params.productId)
        res.redirect("/products/:productId/details")

    } catch (err) {

    }

})

module.exports = router