import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toDate'
})
export class ToDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let dateNumber = +value;
    if (!isNaN(dateNumber)) {
      let date = new Date(dateNumber);
      return date.toDateString();
    }
    return value;
  }

}
