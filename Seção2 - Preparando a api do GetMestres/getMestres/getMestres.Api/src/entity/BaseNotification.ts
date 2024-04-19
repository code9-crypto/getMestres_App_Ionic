export abstract class BaseNotification{
    //Atributos
    notifications: Array<{message: string}>;

    //Construtor
    constructor(){
        this.notifications = new Array<{ message: string }>()
    }

    //Métodos
    //o void depois dos paramêtros, é o tipo de retorno que terá
    //neste caso será vazio
    AddNotification( message:string ): void {
        this.notifications.push({ message:message })
    }

    isTrue(value, message){
        if( value ){
            this.notifications.push({ message:message })
        }
    }

    isRequired(value, message){
        if( !value || value.length <= 0 ){
            this.notifications.push({ message:message })
        }
    }

    hasMinLen( value, min, message ){
        if( !value || value.length < min ){
            this.notifications.push({ message:message })
        }
    }

    hasMaxLen(value, max, message){
        if( !value || value.length > max ){
            this.notifications.push({ message: message })
        }
    }

    isFixedLen( value, len, message ){
        if( value.length != len ){
            this.notifications.push({ message:message })
        }
    }

    isEmail( value, message ){
        var reg = new RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i)
        if( !reg.test(value) ){
            this.notifications.push({ message:message })
        }
    }

    get allNotifications(): Array<{ message: string }>{
        return this.notifications
    }

    valid(): boolean {
        return this.notifications.length == 0;
    }
}