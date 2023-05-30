let proximaAtualizacao2;

    window.onload = obterDadosGraficosgeral();
    function obterDadosGraficosgeral() {
        obterDadosGraficogeral(1)
        




        function obterDadosGraficogeral(idplanta) {

            if (proximaAtualizacao != undefined) {
                clearTimeout(proximaAtualizacao);
            }

            fetch(`/medidas/buscargeral/${idplanta}`, { cache: 'no-store' }).then(function (response) {
                if (response.ok) {
                    response.json().then(function (resposta) {
                        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);


                        plotarGraficogeral(resposta, idplanta);
                    });
                } else {
                    console.error('Nenhum dado encontrado ou erro na API');
                }
            })
                .catch(function (error) {
                    console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
                });

        }

        function plotarGraficogeral(resposta, idplanta) {

            console.log('iniciando plotagem do gráfico...');

            // Criando estrutura para plotar gráfico - labels
            let labels2 = [];

            // Criando estrutura para plotar gráfico1 - dados
            let dados2 = {
                labels: labels2,
                datasets: [{
                    label: 'Votos gerais',
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
                var registro2 = resposta[i];
                labels2.push(registro2.planta);
                dados2.datasets[0].data.push(registro2.planta);
                dados2.datasets[1].data.push(registro2.voto);
                console.log(registro2.momento_grafico)
            }

            console.log('----------------------------------------------')
            console.log('O gráfico será plotado com os respectivos valores:')
            console.log('Labels:')
            console.log(labels2)
            console.log('Dados:')
            console.log(dados2.datasets)
            console.log('----------------------------------------------')

            // Criando estrutura para plotar gráfico - config
            const config = {
                type: 'bar',
                data: dados2,
            };


            // Adicionando gráfico criado em div na tela

            let myChart = new Chart(
                document.getElementById('myChart2'),
                config
            );



            setTimeout(() => atualizarGraficogeral(idplanta, dados2, myChart), 2000);


            function atualizarGraficogeral(idplanta, dados2, myChart) {

                fetch(`/medidas/buscargeral/${idplanta}`, { cache: 'no-store' }).then(function (response) {
                    if (response.ok) {
                        response.json().then(function (novoRegistro) {

                            console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                            console.log(`Dados atuais do gráfico:`);
                            console.log(dados2);

                            let avisoCaptura = document.getElementById(`avisoCaptura${idplanta}`)



                            if (novoRegistro[0].momento_grafico == dados2.labels2[dados2.labels2.length - 1]) {
                                console.log("---------------------------------------------------------------")
                                console.log("Como não há dados novos para captura, o gráfico não atualizará.")

                                console.log("Horário do novo dado capturado:")
                                console.log(novoRegistro[0].momento_grafico)
                                console.log("Horário do último dado capturado:")
                                console.log(dados2.labels2[dados2.labels2.length - 1])
                                console.log("---------------------------------------------------------------")
                            } else {
                                // tirando e colocando valores no gráfico
                                // apagar o primeiro
                                dados2.labels2.push(novoRegistro[0].planta); // incluir um novo momento
                            }

                            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                            proximaAtualizacao = setTimeout(() => atualizarGraficogeral(idplanta, dados2, myChart), 2000);
                        });
                    } else {
                        console.error('Nenhum dado encontrado ou erro na API');
                        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                        proximaAtualizacao = setTimeout(() => atualizarGraficogeral(idplanta, dados2, myChart), 2000);
                    }
                })
                    .catch(function (error) {
                        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
                    });
            }

        }
    }