import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'underline'
})
export class UnderlinePipe implements PipeTransform {

  transform(value: unknown, args: string): any {
    return null;
  }

}
