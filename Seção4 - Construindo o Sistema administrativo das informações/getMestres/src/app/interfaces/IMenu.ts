//Este interface foi criada, pois é este que faz todo
//gerenciamento de forma centralizada dos menus
//OBS.: UMA INTERFACE É USADA SOMENTE PARA EXIBIÇÃO DE DADOS
//NUNCA PARA CARREGAMENTO DE DADOS DO BANCO
export interface IMenu{
    group: string
    items: Array<IMenuItem>
}

export interface IMenuItem{
    label: string
    url: string
    icon: string    
}
