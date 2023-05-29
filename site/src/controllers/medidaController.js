var medidaModel = require("../models/medidaModel");

//-----------------------------------------------------------------------------------------------------------
function buscartop3(req, res) {

    var idplanta = req.params.idplanta;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscartop3(idplanta).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
//----------------------------------------------------------------------------------------------------
function buscargeral(req, res) {

    var idplanta = req.params.idplanta;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscargeral(idplanta).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    buscartop3,
    buscargeral

}