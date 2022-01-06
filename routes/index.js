const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.send("fuck u");
})

const user = require("./user");
router.use('/', user);

const auth = require("./auth");
router.use('/', auth);

module.exports = router