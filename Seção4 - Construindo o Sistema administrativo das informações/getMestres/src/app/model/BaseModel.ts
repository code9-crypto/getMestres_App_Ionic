export abstract class BaseModel{
    //Este atributo faz parte da codificação que gera UUID
    ids: string[] = [];

    //chamando o método para gerar o UUID e atrelando no atributo
    uid: string = this.generate();
    createAt: Date = new Date();
    updateAt: Date = new Date()

    
    //Esta codificação gera o código UUID para cadastrar no banco de dados
    public generate(): string {
        let isUnique = false;
        let tempId = '';

        while (!isUnique) {
            tempId = this.generator();
            if (!this.idExists(tempId)) {
            isUnique = true;
            this.ids.push(tempId);
            }
        }

        return tempId;
    }
    
    public remove(id: string): void {
        const index = this.ids.indexOf(id);
        this.ids.splice(index, 1);
    }
    
    private generator(): string {
        const isString = `${this.S4()}${this.S4()}-${this.S4()}-${this.S4()}-${this.S4()}-${this.S4()}${this.S4()}${this.S4()}`;

        return isString;
    }
    
    private idExists(id: string): boolean {
        return this.ids.includes(id);
    }
    
    private S4(): string {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
}