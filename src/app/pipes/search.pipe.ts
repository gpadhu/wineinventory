import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'searchStore',
  pure: false
})
@Injectable()
export class SearchPipe implements PipeTransform {

  transform(items: any, args?: any): any {

    if (items == null) {
      return [];
    }
    if (args[0] == null) {
      return items;
    }
    
    return items.filter((item) => {
      if (!item.city) { item.city = '' }
     return item.$key.indexOf(args) !== -1 || item.city.toLowerCase().indexOf(args.toLowerCase()) !== -1 
    });
  }

}
