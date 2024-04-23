//Esta classe irá configurar a porta de forma automática e a chave secreta do token
//Caso não tenha nenhuma porta, então será padronizada com 3000
//Isso também será válido para os outras configurações
export default {
    port: process.env.PORT || 3000,
    secretKey: process.env.SECRETKEY || "minhachave",
    publicRoutes: process.env.PUBLICROUTES || [
        "/users/create",
        "/users/auth"
    ]
}
