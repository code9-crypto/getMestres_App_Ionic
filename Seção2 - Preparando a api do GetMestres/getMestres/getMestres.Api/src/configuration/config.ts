//Esta classe irá configurar a porta de forma automática e a chave secreta do token
//Caso não tenha nenhuma porta, então será padronizada com 3000
//Isso também será válido para os outras configurações
export default {
    port: process.env.PORT || 3333,
    folderStorage: process.env.URL_STORAGE || './storage',
    pictureQuality: process.env.PICTURE_QUALITY || 80,
    secretKey: process.env.SECRETKEY || "minhachave",
    //Essas rotas são públicas, ou seja, não precisa do token para acessa-los
    publicRoutes: process.env.PUBLICROUTES || [
        "/users/create",
        "/users/auth",
        "/customer/auth",
        "/customer/create",
        "/serviceProvider/auth",
        "/serviceProvider/create",
        "/storage",
        "/address"
    ]
}
