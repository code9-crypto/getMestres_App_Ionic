import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, count: number, ...args: unknown[]): unknown {
    try{
      if( value.length > count){
        return `${value.substring(0, count)}( ... )`
      }else{
        return value
      }
    }catch(error){
      console.log("TruncatePipe", { value, count, error })
      return value
    }
    
    return null;
  }

}
