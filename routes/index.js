const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.send("fuck u");
})

const user = require("./user");
router.use('/user', user);

module.exports = router