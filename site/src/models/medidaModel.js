var database = require("../database/config");


//-------------------------------------------------------------------------------------------------------------
function buscartop3(idplanta) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select count(usuario.fkplanta) as voto, planta.nomePlanta as planta   
        from usuario join planta on ${idplanta}= fkplanta group by nomePlanta order by voto desc limit 3`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
select count(usuario.fkplanta) as voto, planta.nomePlanta as planta   
        from usuario join planta on idplanta= fkplanta group by nomePlanta order by voto desc limit 3;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
//------------------------------------------------------------------------------------------------------
function buscargeral(idplanta) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select count(usuario.fkplanta) as voto , planta.nomePlanta as planta   
        from usuario join planta on ${idplanta}= fkplanta group by planta;3`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        select count(usuario.fkplanta) as voto , planta.nomePlanta as planta   
        from usuario join planta on idplanta= fkplanta group by planta;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    buscartop3,
    buscargeral
   
}
