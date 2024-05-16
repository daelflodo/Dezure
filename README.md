<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
 
## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## .env
PORT = \
DB_HOST = \
DB_PORT = \
DB_USER = \
DB_PASSWORD = \
DB_NAME =

## docker-compose, init.sql
[Docker:](https://github.com/nestjs/nest) Ejecutar en el terminal para crear el contenedor del archivo docker-compose.yml 
 ```bash
sudo docker-compose up -d
```
```bash
# al ejecutarse se crea la base de dato dezuredb automaticamente en el contenedor para postgres en docker
SELECT 'CREATE DATABASE dezuredb'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE dataname = 'dezuredb')\gexec
```
## Migrations
* Generar una migracion
````
npm run m:gen -- ./migrations/'name_migration'

````
* Ejecutar la Migracion generada
````
npm run m:run
````
## Exceptions
### Request CustomException
````
import { createCustomException } from 'src/common/exceptions/exceptionsGenerator';

if (userFound) {
      throw createCustomException(
        'El mensage para mostrar',
        409,
        'User',
      );
    }
````
### Response CustomException
````
{
    "timesstamps": "2024-04-21T18:43:38.308Z",
    "path": "/api/user",
    "error": {
        "message": "El mensage para mostrar",
        "error": "ERROR_USER_CONFLICTC",
        "statusCode": 409
    }
}
````
## Examples optimize endpoint
````
[POST]--> api/controller/create
[GET]--> api/controller/all
[GET]--> api/controller/:id
[UPDATE]--> api/controller/edit/:id
[PATCH]--> api/controller/edit/:id
[DELETE]--> api/controller/delete/:id
````

## Frequent questions

### ¿Qué es un middleware y cuál es su utilidad en una aplicación backend?
Un middleware es una función que se ejecuta entre una solicitud entrante y la respuesta enviada por el servidor en una aplicación web. Su utilidad principal en una aplicación backend es manipular la solicitud y/o la respuesta antes de que estas lleguen a su destino final. Los middlewares son útiles para tareas como autenticación, autorización, logging, manejo de errores, entre otros.

### ¿Qué es SQL Injection y cómo puede evitarse?
SQL Injection es una vulnerabilidad de seguridad que ocurre cuando un atacante inserta código SQL malicioso en una consulta SQL que se ejecuta en la base de datos. Esto puede permitir al atacante manipular la base de datos, acceder a información sensible o incluso eliminar datos.

Para evitar SQL Injection, es importante utilizar consultas parametrizadas o consultas preparadas, en lugar de concatenar valores directamente en la consulta SQL. Además, es recomendable utilizar librerías ORM (Object-Relational Mapping) o Query Builders que automatizan la creación de consultas SQL seguras.

````
port async function getTodo(id) {
  const [rows] = await pool.query(`SELECT * FROM todos WHERE id = ?`, [id]);
  return rows[0];
}
````

### ¿Cuándo es conveniente utilizar SQL Transactions? Dar un ejemplo.
Son útiles cuando necesitas realizar operaciones en una base de datos que deben ser tratadas como una unidad atómica, es decir, deben ejecutarse todas correctamente o ninguna para mantener la integridad de los datos.
Supongamos que tienes una base de datos que almacena información sobre cuentas bancarias y necesitas realizar una transferencia de fondos entre dos cuentas. En este caso, querrás usar una transacción para asegurarte de que la transferencia se complete correctamente y que no haya inconsistencias si algo sale mal en el proceso.

### Usando async/await: ¿cómo se puede aprovechar el paralelismo?
se puede aprovechar el paralelismo al ejecutar múltiples operaciones asíncronas al mismo tiempo y esperar que todas se completen antes de continuar con la ejecución del código. Esto se puede lograr utilizando Promise.all() para esperar múltiples promesas al mismo tiempo.

````
async function fetchData() {
  const [userData, postsData] = await Promise.all([
    fetchUserData(),
    fetchPostsData()
  ]);

  // Ambas promesas se completaron, ahora podemos trabajar con los datos obtenidos
  console.log(userData);
  console.log(postsData);
}

````

## Support
- Author - [David Flores](https://github.com/daelflodo)

