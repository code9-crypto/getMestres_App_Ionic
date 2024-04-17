/*interface x{

}

class Pessoa implements x {
    list:Array<number>

    constructor(){
        //com esse tipo de condificação
        //só aceita os tipos conforme a tipagem
        this.list.push(1);
    }
}*/

class pessoaEntidade{
    nome: string
    idade: number
}

class pessoaRepositorio{
    pessoas: Array<pessoaEntidade>

    //isso é uma forma de declarar uma função
    add(){
        this.pessoas.push({
            nome: "william",
            idade: 32
        })
    }
}