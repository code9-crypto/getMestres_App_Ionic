//Esta classe irá configurar a porta de forma automática
//Caso não tenha nenhuma porta, então será padronizada com 3000
export default {
    port: process.env.PORT || 3000,
    secretKey: process.env.SECRETKEY || "minhachave"
}
