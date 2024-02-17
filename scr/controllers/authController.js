const router = require('express').Router();
const authService = require("../services/authService")
const { isAuth } = require('../middleware/authMiddleware')
const { getErrorMessage } = require('../utils/errorHandles')
router.get('/register', (req, res) => {

    res.render('register');

})

router.post('/register', async (req, res) => {

    const userData = req.body
    try {
        const result = await authService.register(userData)
        if (result) {
            res.redirect("/auth/login")
        }
    } catch (result) {
        console.log(result);
        const message = getErrorMessage(result)
        res.render('register', { message });

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
        req.user = email
        res.redirect("/")
    } catch (err) {
        res.render('login', { message: err.message });

    }

});


router.get('/logout', isAuth, (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});


module.exports = router