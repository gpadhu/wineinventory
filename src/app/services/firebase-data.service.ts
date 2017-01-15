import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { API } from './config';
import { NotificationService } from './notification.service';

@Injectable()
export class FirebaseDataService {
  public stores: FirebaseListObservable<any>;
  public wines: FirebaseListObservable<any>;
  public wineStores: any;
  constructor(private af: AngularFire, private http: Http,
              private notification: NotificationService) {
    this.stores = this.af.database.list('/stores');
    this.wines = this.af.database.list('/wines');
   }

  getStores() {
    return this.stores;
  }

  getWines() {
    return this.wines;
  }

  getWine(id: number) {
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

 getStore(id: number) {
   return this.af.database.object('stores/' + id);
 }

 getStocks(id: number) {
   return this.af.database.list('/stocks', {
          query: {
            orderByChild: 'store',
            equalTo: id
          }
      });
 }

 saveWine(wine: any) {
   return this.af.database.object('/wines/' + wine.wine)
          .update({ name: wine.name, updated: 0 });
 }

 updateStocks(wine) {
   this.notification.sendNotification('Queued!', 'Your request to update the store #' + wine.$key + ' is queued.');
    if (this.checkDate(wine.updated)) {
      this.http.get(API.production + wine.$key).map((res) => res.json())
       .subscribe((stocks) => {
         this.saveStocks(stocks, wine);
         this.notification.sendNotification('Completed', 'Stocks for the #'
              + wine.$key + ' ' + wine.name + ' has been successfullly updated in ' + stocks.length + ' stores');
        }, (error) => {
          console.log(error);
          this.notification.sendNotification('Failed!', 'Error Code :' + error.status + ' Status: ' + error.statusText  );
        });
   } else {
     this.notification.sendNotification('Sorry!', 'This wine already updated today.');
   }
 }

 checkDate(date: number) {
   if (new Date(date).toDateString() === new Date().toDateString()) {
     return false;
   } else {
     return true;
   }
 }

 saveStocks(stocks, wine) {
   let fireStocks = this.af.database.list('/stocks');

   stocks.forEach((stock) => {
     let store = +stock.store;
     let storeCity = stock.address;
     if (!storeCity) { storeCity = ''; }
     let wineID = +wine.$key;
     let stockCount = +stock.stock;
     let name = wine.name;
     let date = Number(new Date());
     fireStocks.push({ date: date, name: name,
                      stock: stockCount, store: store, wine: wineID });
     let fireStores = this.af.database.object('/stores/' + store);
     fireStores.update({city: storeCity});
   });
   console.log(stocks);
   let fireWine = this.af.database.object('/wines/' + wine.$key);
   fireWine.update({ updated: Number(new Date())});
 }

 updateAllStocks(wines: any) {
   this.notification.sendNotification('Queued!', 'Your request to update the stocks has been scheduled.');
     let updateWines = wines.filter( (stock) => {
       return (new Date(stock.updated)).toDateString() !== (new Date()).toDateString()
     });
     this.doUpdateProcess(updateWines);
     this.notification.sendNotification('Update!',
    '' + (wines.length - updateWines.length) +
     ' has been already updated today.' + (updateWines.length === 0 ? '' :  'Remainings will be processed soon.' ));
   }

  doUpdateProcess(wines: any) {
    wines.forEach( (wine, index) => {
      setTimeout(() => {
          this.updateStocks(wine);
      }, 5000 * (index + 1));
    });
  }
}
