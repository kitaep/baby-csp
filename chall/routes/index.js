const express = require("express");
const router = express.Router();
const { loginRequired } = require("../middleware/middleware")

router.get('/', (req, res) => {
    res.render("index");
})

const userRouter = require("./user");
router.use('/user', loginRequired, userRouter);

const authRouter = require("./auth");
router.use('/', authRouter);

module.exports = router