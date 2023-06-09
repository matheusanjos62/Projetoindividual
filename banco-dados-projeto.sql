create database projeto;

use projeto;

create table usuario(
idUsuario int primary key auto_increment,
nome varchar(45),
email varchar(45),
senha varchar(45),
fkplanta int,
foreign key (fkplanta)  references planta (idplanta)
);

SELECT * FROM usuario;
SELECT * FROM planta;

insert into usuario values
(null,'matheus','matheus@','123456','jiboia');

create table planta(
idplanta int primary key auto_increment,
nomePlanta varchar(45)
);



insert into planta values
(null,'cacto'),
(null,'costela de adao'),
(null,'suculenta'),
(null,'anturio'),
(null,'jiboia'),
(null,'zamioculca'),
(null,'aspargo pluma'),
(null,'aglaonema'),
(null,'croton'),
(null,'palmeira areca'),
(null,'pau dagua'),
(null,'orquidea'),
(null,'lirio da paz'),
(null,'bromelia'),
(null,'bambu da sorte'),
(null,'peperomia');


SELECT * FROM usuario;
select count(usuario.fkplanta) as voto , planta.nomePlanta as planta   
        from usuario join planta on idplanta= fkplanta group by planta;


select count(usuario.fkplanta) as voto, planta.nomePlanta as planta   
        from usuario join planta on idplanta= fkplanta group by nomePlanta order by voto desc limit 3;