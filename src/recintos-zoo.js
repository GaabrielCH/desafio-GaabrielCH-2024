class RecintosZoo {
    // contrutor com os recintos e animais
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, animais: ['MACACO', 'MACACO', 'MACACO'], quantidade : 3 },
            { numero: 2, bioma: 'floresta', tamanho: 5, animais: [], quantidade : 0 },
            { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: ['GAZELA'], quantidade : 1 },
            { numero: 4, bioma: 'rio', tamanho: 8, animais: [], quantidade : 0 },
            { numero: 5, bioma: 'savana', tamanho: 9, animais: ['LEAO'], quantidade : 1 }
        ];

        this.animais = [
            { especie: 'LEAO', tamanho: 3, bioma: 'savana', carnivoro: true },
            { especie: 'LEOPARDO', tamanho: 2, bioma: 'savana', carnivoro: true },
            { especie: 'CROCODILO', tamanho: 3, bioma: 'rio', carnivoro: true },
            { especie: 'MACACO', tamanho: 1, bioma: 'savana ou floresta', carnivoro: false },
            { especie: 'GAZELA', tamanho: 2, bioma: 'savana', carnivoro: false },
            { especie: 'HIPOPOTAMO', tamanho: 4, bioma: 'savana ou rio', carnivoro: false }
        ];

    }

    analisaRecintos(animal, quantidade) {
        const animalInfo = this.animais.find(a => a.especie === animal);
        
        // se não encontrar o animal
        if(!this.animais.find(a => a.especie === animal)) {
            return { erro: "Animal inválido" };
        }

        // se a quantidade for menor ou igual a 0 ou não for um número inteiro
        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: "Quantidade inválida" };
        }

        const espacoOcupado = animalInfo.tamanho * quantidade;

        const recintosViaveis = this.recintos.filter(recinto => {
                // separar por ou e e para verificar se o bioma é compatível
                const biomasAnimal = animalInfo.bioma.split(' ou ');
                const biomasRecinto = recinto.bioma.split(' e ');
                const biomaCompatível = biomasAnimal.some(bioma => biomasRecinto.includes(bioma));

                if (!biomaCompatível) {
                    return false;
                }
                
                // verificar se o recinto tem espaço suficiente
                if(recinto.tamanho - recinto.animais.length >= quantidade) {
                    if(recinto.bioma === animalInfo.bioma) {
                        return true;
                    }
                }
                
                // verificar se o recinto tem espaço suficiente
                const espacoUtilizado = recinto.animais.reduce((acc, especie) => {
                    const infoAnimal = this.animais.find(a => a.especie === especie);
                    return acc + (infoAnimal ? infoAnimal.tamanho : 0);
                }, 0);
                
                // verificar se o recinto tem animais carnívoros
                const carnivoro = animalInfo.carnivoro;
                const animaisCarnivoros = recinto.animais.map(a => {
                    const infoAnimal = this.animais.find(animal => animal.especie === a);
                    return infoAnimal ? infoAnimal.carnivoro : false;
                });
                
                // verificar se é possível adicionar o animal ao recinto
                if (carnivoro) {
                    if (animaisCarnivoros.includes(true) || animaisCarnivoros.length === 0) {
                        const espacoLivre = recinto.tamanho - espacoUtilizado;
                        return espacoLivre >= espacoOcupado;
                    } else {
                        return false;
                    }
                } else {
                    if (animaisCarnivoros.includes(true)) {
                        return false;
                    } else {
                        const espacoLivre = recinto.tamanho - espacoUtilizado;
                        return espacoLivre >= espacoOcupado;
                    }
                }
            })
            .map(recinto => {
                // calcular espaço livre no recinto e retornar a string formatada
                const espacoUtilizado = recinto.animais.reduce((acc, especie) => {
                    const infoAnimal = this.animais.find(a => a.especie === especie);
                    return acc + (infoAnimal ? infoAnimal.tamanho : 0);
                }, 0);
                const espacoLivre = recinto.tamanho - espacoUtilizado;
                
                // retornar a string formatada
                return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre - espacoOcupado} total: ${recinto.tamanho})`;
            });
        
        // se não houver recintos viáveis
        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintosViaveis };
    }

}

export { RecintosZoo as RecintosZoo };
