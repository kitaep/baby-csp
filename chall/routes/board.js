const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const db = require("../db");

router.get("/", (req, res, next) => {
    db.query("SELECT * FROM board WHERE username = ?", [req.user.username],
    (error, results, fields) => {
        if (error) { return next(error) }
        results = JSON.parse(JSON.stringify(results));
        console.log(results)
        res.render("board", {"results":results});
    }
    );
});

router.get("/new", (req, res, next) => {
    res.render("board_new");
});

router.post("/new", (req, res, next) => {
    let page_uuid = uuid.v4()
    db.query("INSERT INTO board (uuid, title, content, username, admin_viewed) VALUES (?, ?, ?, ?, ?)",
        [page_uuid, req.body.title, req.body.content, req.user.username, false],
        (error, results, fields) => {
            if (error) { return next(error) }
            res.redirect(`./view/${page_uuid}`)
        }
    )
});

router.get("/view/:uuid", (req, res, next) => {

    db.query("SELECT * FROM board WHERE uuid = ?", [req.params.uuid], 
    (error, results, fields)=> {
        if (error) { return next(error) }
        if (!results[0]) { return res.sendStatus(404) }

        console.log(results)

        var nonceFlag;
        var _nonce = uuid.v4();
        var content_user = results[0].username;
        var content = results[0].content;

        db.query("SELECT * FROM users WHERE username = ?", [content_user], (error, results, fields) => {
            if (error) { return next(error) }
            console.log(results)
            nonceFlag = results[0].nonce_flag;
    
            if (nonceFlag) {
                db.query("SELECT nonce FROM nonces WHERE username = ?", [content_user], (error, results, fields) => {
                    if (error) { return next(error) }
                    if (!results[0]) {
                        db.query("INSERT INTO nonces (username, nonce) VALUES (?, ?)", [content_user, _nonce], (err) => {
                            if (err) { return next(err) }
                        });
                    } else {
                        _nonce = results[0].nonce;
                    }
                });
            };
            
            res.set("Content-Security-Policy",`default-src 'none'; script-src 'nonce-${_nonce}'; style-src *; font-src *; base-uri 'none';`);
            res.send(content);
        });
    
    });
});

//router.get("/{uid}")

module.exports = router;