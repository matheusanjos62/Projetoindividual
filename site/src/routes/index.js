var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
    res.render("projeto_cultivo", { title: "Express" });
});

module.exports = router;