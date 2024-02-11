const router = require('express').Router();

router.get('/', (req, res) => {

    res.render("home")
})

router.get("/create", (req, res) => {

    res.render("create")

})


router.post('/create', async (req, res) => {


});

router.get('/details', (req, res) => {
    res.render("details")
});

router.post("details", (req, res) => {

});




router.get('/catalog', (req, res) => {
    res.render("catalog")

});


router.get('/search', (req, res) => {
    res.render("search")
});

router.post('/search', (req, res) => {
});


router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});
module.exports = router