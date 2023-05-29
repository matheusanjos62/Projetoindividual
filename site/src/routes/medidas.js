var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");


router.get("/buscartop3/:idplanta", function (req, res) {
    medidaController.buscartop3(req, res);
});

router.get("/buscargeral/:idplanta", function (req, res) {
    medidaController.buscargeral(req, res);
});

module.exports = router;