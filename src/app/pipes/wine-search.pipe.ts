import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'wineSearch'
})
@Injectable()
export class WineSearchPipe implements PipeTransform {

  transform(items: any, args?: any): any {
    if (items == null) {
      return [];
    }
    if (args[0] == null) {
      return items;
    }
    return items.filter((item) => {
     return item.$key.indexOf(args) !== -1 || item.name.toLowerCase().indexOf(args.toLowerCase()) !== -1 
    });
  }

}
