# case-desenvolvimento-blue

## Para dar start backend
<p>abrir case-desenvolvimento-blue/backend</p>
<p>- npm install </p>
<p> - npm run start </p>


## Para dar start backend
<p>abrir case-desenvolvimento-blue/backend</p>
<p>- npm install </p>
<p>- npm run start </p>

## Modelagem do banco de dados

### O banco está rodando na AWS.



```sql
CREATE TABLE imoveis(
	id VARCHAR(255) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE usuarios(
	id VARCHAR(255) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM("normal", "admin") DEFAULT "normal"
);

CREATE TABLE votos(
	id VARCHAR(255) PRIMARY KEY,
    usuario_votante VARCHAR(255) NOT NULL,
    imovel_votado VARCHAR(255) NOT NULL,
    FOREIGN KEY (usuario_votante) REFERENCES usuarios(id),
    FOREIGN KEY (imovel_votado) REFERENCES imoveis(id)
);

```