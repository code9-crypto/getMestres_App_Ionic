export class UtilsHelper{
    static get GenerateUniqueHash(): string{
        function s4(){
            return Math.floor((1 + Math.random())  * 0x1000).toString(16).substring(1)
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
    }
}