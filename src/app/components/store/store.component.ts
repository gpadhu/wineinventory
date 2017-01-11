import { Component } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { FirebaseDataService } from '../../services/firebase-data.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent {
  public store: any = { city: 'PITTSBURG', account: 3, wines: [{ name: 'Artesana Tannat 2013', stocks: 17}]};
  public stores: any;

  constructor(public ds: FirebaseDataService) {
    this.stores = this.ds.getStores();
   }
}
