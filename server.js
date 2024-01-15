// UMA DAS CRIAÇÕES DE SERVIDOR HTTP USANDO NODE DE FORMA CONVENCIONAL
/*import{createServer} from 'node:http' 

const server = createServer((request, response) => {
    response.write("hello world")

    return response.end()
})

server.listen(3333) */

// CRIAÇÃO DO SERVIDOR USANDO O FASTIFY (ALTERNATIVA AO EXPRESS)
import {fastify} from 'fastify'
//import{DatabaseMemory} from './database-memory.js' //importando nosso banco de dados em memória
import { DatabasePostgres } from './database-postgres.js'

const server = fastify() //criação do servidor

//const database = new DatabaseMemory() //instanciação do banco de dados aqui no servidor

const database = new DatabasePostgres();

//criação das rotas com o fastify. Rotas para vídeos
server.post('/videos', async (request, response) => {
    const {title, description, duration} = request.body  //desestruturação

    await database.create({
        title: title,
        description: description,
        duration: duration,
    })

    return response.status(201).send()  //o status retorna o status code, ou seja, se algo foi realizado com sucesso ou teve erro. O 201, mostra se foi criado algo ou não.
})

server.get('/videos', (request) => {
    const search = request.query.search //criando variável para usar query params

    const videos = database.list(search);

    return videos;
})

server.put('/videos/:id', async (request, reply) => {  // esta rota será pelo id
    const videoId = request.params.id;
    const {title, description, duration} = request.body  //aqui passamos as informações que queremos alterar no update

    await database.update(videoId, {
        title,
        description,
        duration,
    })

    return reply.status(204).send() //204 é uma resposta que teve sucesso, mas que não tem conteúdo na resposta
})

server.delete('/videos/:id', async (request, reply) => {  // esta rota será pelo id
    const videoId = request.params.id;

    await database.delete(videoId);

    return reply.status(204).send()
})

server.listen({  //passa um obj para poder instaciar a porta
    port: process.env.PORT ?? 3333,  //porta da servidor e também para o Render designar um porta automaticamente
})