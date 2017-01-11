import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class FirebaseDataService {
  public stores: FirebaseListObservable<any>;
  public wines: FirebaseListObservable<any>;
  public wineStores: any;

  constructor(private af: AngularFire) {
    this.stores = this.af.database.list('/stores');
    this.wines = this.af.database.list('/wines');
   }

  getStores() {
    return this.stores;
  }

  getWines() {
    return this.wines;
  }

  getWine(id: string) {
    return this.af.database.object('/wines/' + id);
  }

  getwineStores(wine: any) {
    return  this.af.database.list('stocks', {
        query: {
          orderByChild: 'wine',
          equalTo: +wine.$key
        }
      });
 }

 getStore(id: string) {
   return this.af.database.object('stores/' + id);
 }

 getStocks(id: number){
   return this.af.database.list('/stocks', {
          query: {
            orderByChild: 'store',
            equalTo: id
          }
      });
  }

}
