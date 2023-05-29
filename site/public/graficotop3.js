
    let proximaAtualizacao;

    window.onload = obterDadosGraficostop3();
    function obterDadosGraficostop3() {
        obterDadosGraficotop3(1)
        




        function obterDadosGraficotop3(idplanta) {

            if (proximaAtualizacao != undefined) {
                clearTimeout(proximaAtualizacao);
            }

            fetch(`/medidas/buscartop3/${idplanta}`, { cache: 'no-store' }).then(function (response) {
                if (response.ok) {
                    response.json().then(function (resposta) {
                        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);


                        plotarGraficotop3(resposta, idplanta);
                    });
                } else {
                    console.error('Nenhum dado encontrado ou erro na API');
                }
            })
                .catch(function (error) {
                    console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
                });

        }

        function plotarGraficotop3(resposta, idplanta) {

            console.log('iniciando plotagem do gráfico...');

            // Criando estrutura para plotar gráfico - labels
            let labels = [];

            // Criando estrutura para plotar gráfico1 - dados
            let dados = {
                labels: labels,
                datasets: [{
                    label: 'top 3',
                    data: [],
                    fill: false,
                    borderColor: 'rgb(75, 192, 192),',
                    tension: 0.1
                },
                {
                    label: '',
                    data: [],
                    fill: false,
                    backgroundColor: 'rgb(0,128,0)',
                    tension: 0.1
                }
                ]
            };

           



            // Criando estrutura para plotar gráfico2 - dados


            console.log('----------------------------------------------')
            console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
            console.log(resposta)

            // Inserindo valores recebidos em estrutura para plotar o gráfico
            for (i = 0; i < resposta.length; i++) {
                var registro = resposta[i];
                labels.push(registro.planta);
                dados.datasets[0].data.push(registro.planta);
                dados.datasets[1].data.push(registro.voto);
                console.log(registro.momento_grafico)
            }

            console.log('----------------------------------------------')
            console.log('O gráfico será plotado com os respectivos valores:')
            console.log('Labels:')
            console.log(labels)
            console.log('Dados:')
            console.log(dados.datasets)
            console.log('----------------------------------------------')

            // Criando estrutura para plotar gráfico - config
            const config = {
                type: 'bar',
                data: dados,
            };


            // Adicionando gráfico criado em div na tela

            let myChart = new Chart(
                document.getElementById('myChart'),
                config
            );



            setTimeout(() => atualizarGraficotop3(idplanta, dados, myChart), 2000);


            function atualizarGraficotop3(idplanta, dados, myChart) {

                fetch(`/medidas/buscartop3/${idplanta}`, { cache: 'no-store' }).then(function (response) {
                    if (response.ok) {
                        response.json().then(function (novoRegistro) {

                            console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                            console.log(`Dados atuais do gráfico:`);
                            console.log(dados);

                            let avisoCaptura = document.getElementById(`avisoCaptura${idplanta}`)



                            if (novoRegistro[0].momento_grafico == dados.labels[dados.labels.length - 1]) {
                                console.log("---------------------------------------------------------------")
                                console.log("Como não há dados novos para captura, o gráfico não atualizará.")

                                console.log("Horário do novo dado capturado:")
                                console.log(novoRegistro[0].momento_grafico)
                                console.log("Horário do último dado capturado:")
                                console.log(dados.labels[dados.labels.length - 1])
                                console.log("---------------------------------------------------------------")
                            } else {
                                // tirando e colocando valores no gráfico
                                // apagar o primeiro
                                dados.labels.push(novoRegistro[0].planta); // incluir um novo momento
                            }

                            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                            proximaAtualizacao = setTimeout(() => atualizarGraficotop3(idplanta, dados, myChart), 2000);
                        });
                    } else {
                        console.error('Nenhum dado encontrado ou erro na API');
                        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                        proximaAtualizacao = setTimeout(() => atualizarGraficotop3(idplanta, dados, myChart), 2000);
                    }
                })
                    .catch(function (error) {
                        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
                    });
            }

        }
    }
