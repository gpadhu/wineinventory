import { Component } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { FirebaseDataService } from '../../services/firebase-data.service';
import { LoadingBarService } from 'ng2-loading-bar';
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent {
  public store: any = { city: 'PITTSBURG', account: 3, wines: [{ name: 'Artesana Tannat 2013', stocks: 17}]};
  public stores: any;

  constructor(public ds: FirebaseDataService, public loadingbar: LoadingBarService) {
    this.loadingbar.start();
    this.stores = this.ds.getStores();
    this.stores.subscribe((completed) => {
      if (completed == null) {
        this.loadingbar.stop();
      } else {
        this.loadingbar.complete();
      }
    });
   }
}
