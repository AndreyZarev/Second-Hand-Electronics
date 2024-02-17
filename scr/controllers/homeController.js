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
    let isLoggedIn;
    if (req.user?.email) { isLoggedIn = true } else { isLoggedIn = false }

    const product = await createService.getProduct(productId).lean()
    const isCreator = product.owner?.email === req.user?.email
    let isBought = await createService.isBought(req.user?._id, req.params.productId).lean()

    isBought = isBought.buyingList[0] === req.user?._id



    // const isCreator = await createService.getCreator(req.params)
    res.render("details", { product, isCreator, isLoggedIn, isBought })
})

router.get('/:productId/buy', async (req, res) => {
    const userId = req.user._id

    try {
        await createService.buy(userId, req.params.productId)

        res.redirect(`/products/${req.params.productId}/details`)

    } catch (err) {
        res.redirect(`/products/${req.params.productId}/details`)
    }

})

router.get("/product/:productId/delete", (req, res) => {
    createService.deleteProduct(req.params.productId)
    res.redirect("/catalog")
})

router.get("/product/:productId/edit", async (req, res) => {
    const productData = await createService.getProduct(req.params.productId).lean()

    res.render("edit", { ...productData })
})


router.post("/product/:productId/edit", async (req, res) => {
    const productChanges = req.body
    createService.updateProduct(req.params.productId, productChanges)
    res.redirect(`/products/${req.params.productId}/details`)
})

module.exports = router