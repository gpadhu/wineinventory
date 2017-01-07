import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.css']
})
export class StoreDetailComponent implements OnInit {
  private id: string;
  private sub: any;
  public store: any = { id: '0208', city: 'PITTSBURG', account: 3, wines: [{ name: 'Artesana Tannat 2013', stocks: 17}]};
  constructor(private aRoute: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.aRoute.params.subscribe(params => {
      this.id = params['id'];
    });
  }

}
