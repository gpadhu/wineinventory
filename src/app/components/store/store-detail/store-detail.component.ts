import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.css']
})
export class StoreDetailComponent implements OnInit {
  private id: number;
  private sub: any;
  public store: FirebaseObjectObservable<any>;
  public stocks: FirebaseListObservable<any>;
  public days: any;
  public wines: any;
  public table_data: any;
  public table_columns: any = ['Wines', '% Sold Through', 'Units at Store Now'];
  constructor(private aRoute: ActivatedRoute, public af: AngularFire) {}

  ngOnInit() {
    this.sub = this.aRoute.params.subscribe(params => {
      this.id = +params['id'];
      this.store = this.af.database.object('/stores/' + this.id);
      this.stocks = this.af.database.list('/stocks', {
        query: {
          orderByChild: 'store',
          equalTo: this.id,
          limitToFirst: 10
        }
    });
    });

    this.stocks.subscribe(newstocks => {
      this.days = newstocks.filter((stock, index, self) => self.findIndex((t) => {return t.date === stock.date; }) === index);
      this.days = this.days.map((day) => day.date);

      this.wines = newstocks.filter((stock, index, self) => self.findIndex((t) => {return t.wine === stock.wine; }) === index);
      this.wines = this.wines.map((wine) => wine.wine);
      this.prepareTableData();
  });

  }

  prepareTableData() {
    this.table_data = [];
    this.table_columns = this.table_columns.concat(this.days);
    console.log(this.table_columns);

    this.wines.forEach((wine, index) => {
      this.table_data.push([wine, 'sold through %', 'units at store now', '']);
    });

    console.log(this.table_data);
  }

}
