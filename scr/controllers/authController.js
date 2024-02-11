const router = require('express').Router();
const authService = require("../services/authService")


router.get('/register', (req, res) => {

    res.render('register');

})

router.post('/register', async (req, res) => {

    const userData = req.body

    try {
        await authService.register(userData)

        res.redirect("/auth/login")

    } catch (err) {
        res.render('register', { message: err.message });
    }

});


router.get('/login', (req, res) => {
    res.render('login')
});

router.post('/login', async (req, res) => {

    const { email, password } = req.body

    try {
        const token = await authService.login(email, password);
        res.cookie('auth', token);
        res.redirect("/")
    } catch (err) {
        res.render('login', { message: err.message });

    }

});


module.exports = router