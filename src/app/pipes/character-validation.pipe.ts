
import { Pipe, PipeTransform } from '@angular/core';



@Pipe({
  name: 'characterValidation'
})
export class CharacterValidationPipe implements PipeTransform {
  invalidCharacters: string[] = ["Ã", "Â", "Â", "ã", "â", "€", "", "³"]; //Characters that should be removed from the string
  gapCharacters: string[] = ["@"] //Characters that should have gaps before and after them

  transform(value: string): string {
    let finalValue : string = ''
    let tempValue: string = value;

    // Checks if the value contains any invalid characters
    for(let char in this.invalidCharacters){
      tempValue = tempValue.replace(this.invalidCharacters[char], '')
    }


    let valueArray = Array.from(tempValue);

    for (let char in valueArray) {
      let tempChar = valueArray[char];
      if (this.gapCharacters.includes(tempChar)) {
        let currentChar = parseInt(char);
        if(valueArray[currentChar + 1] !== ' ' && valueArray[currentChar - 1] !== ' ') {
          valueArray[currentChar] = ' '+ valueArray[currentChar] + ' ';
          }
      }
    }
    tempValue = valueArray.join('')

    

    finalValue = tempValue;
    return finalValue;
  }

}
