import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  public store: any = { city: 'PITTSBURG', account: 3, wines: [{ name: 'Artesana Tannat 2013', stocks: 17}]};
  public stores: FirebaseListObservable<any>;

  constructor(af: AngularFire) {
    this.stores = af.database.list('/stores');
   }

  ngOnInit() {
  }

}
