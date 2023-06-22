import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlFormatter'
})
export class UrlFormatterPipe implements PipeTransform {
  transform(value: string): string {
    let spaceTypes = [" "," ", " " ]
    let v = value;

    v = v.toLowerCase()

    spaceTypes.forEach(space => {
      v = v.replace(space, '-')
      v = v.replace('(','')
      v = v.replace(')','')
    });

    return value;
  }
}
