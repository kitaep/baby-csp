const express = require("express");
const router = express.Router();
const { loginRequired } = require("../middleware/middleware")

router.get('/', (req, res) => {
    res.render("index");
})

const authRouter = require("./auth");
router.use('/', authRouter);

const userRouter = require("./user");
router.use('/user', loginRequired, userRouter);


const boardRouter = require("./board");
router.use('/board', loginRequired, boardRouter);

module.exports = router