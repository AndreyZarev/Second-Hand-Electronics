const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.resolve("scr/static")))

app.use(express.urlencoded({ extended: false }))



const port = 3000
app.listen(port, () => console.log("Server listening on port " + port))