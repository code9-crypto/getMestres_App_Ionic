import { timestamp } from "rxjs";

export abstract class BaseModel{
    uid: string = '';
    createAt: string = timestamp.toString();
    updateAt: string = timestamp.toString()
    
}