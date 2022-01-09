const express = require('express');

const router = express.Router();

router.get("/", (req, res) => {
    res.send(req.user);
});

router.get("upload")

module.exports = router;