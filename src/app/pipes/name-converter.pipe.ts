import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameConverter'
})
export class NameConverterPipe implements PipeTransform {

  transform(value: string): string {
    let v = value;

    v = v.replace( /_/gi, ' ')

    const arr = v.split(" ");

    //loop through each element of the array and capitalize the first letter.


    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

    }

    //Join all the elements of the array back into a string 
    //using a blankspace as a separator 
    const finalValue = arr.join(" ");

    //Outptut: I Have Learned Something New Today
    
    return finalValue;
  }

}
