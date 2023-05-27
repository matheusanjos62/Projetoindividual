var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idplanta", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idplanta", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
});

router.get("/buscartop3/:idplanta", function (req, res) {
    medidaController.buscartop3(req, res);
});
router.get("/buscar/:idplanta2", function (req, res) {
    medidaController.buscar(req, res);
});

module.exports = router;