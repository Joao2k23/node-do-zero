//BANCO DE DADOS EM MEMÓRIA
import { randomUUID } from 'node:crypto'

//CRIAÇÃO DA CLASSE
export class DatabaseMemory {
    #videos = new Map()    // #videos é uma chave privada, ou seja, essa informação só será vista por dentro da classe

    list(search){
        return Array.from(this.#videos.entries()).map((videoArray) => {  //O array.from converte uma estrutura de dados que não é um array em um array. O entries() retorna os valores e o ID. map() percorre o array
            const id = videoArray[0];
            const data = videoArray[1];

            return {
                id,
                ...data,
            }
        }) 
        .filter(video => {
            if(search){
                return video.title.includes(search) //aqui ele vai retornar apenas os videos que tiveram a palavra buscada no query params
            }
            else{
                return true
            }
        })
    }
    
    create(video){
        const videoId = randomUUID()

        this.#videos.set(videoId, video);  //set faz parte do "Map" instanciado acima. O Map é uma estrutura de dados do node
    }

    update(id, video){
        this.#videos.set(id, video);
    }

    delete(id){
        this.#videos.delete(id);
    }
}