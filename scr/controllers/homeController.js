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

    try {
        await createService.createPost(productData)

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
    console.log(product.__v);
    console.log(req.user);

    // const isCreator = await createService.getCreator(req.params)
    res.render("details", { product })
})

module.exports = router