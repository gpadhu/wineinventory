import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  public store: any = { city: 'PITTSBURG', account: 3, wines: [{ name: 'Artesana Tannat 2013', stocks: 17}]};
  public stores: any = [ {id: '0207', city: 'PITTSBURG', account: 3},
                         {id: '0208', city: 'PITTSBURG', account: 3},
                         {id: '0209', city: 'PITTSBURG', account: 3},
                         {id: '0201', city: 'PITTSBURG', account: 3},
                         {id: '0201', city: 'PITTSBURG', account: 3}
                       ];
  constructor() { }

  ngOnInit() {
  }

}
