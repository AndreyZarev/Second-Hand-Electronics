
const router = require('express').Router();

const homeController = require('./scr/controllers/homeController')


router.use(homeController)
module.exports = router