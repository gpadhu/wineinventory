import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { FirebaseDataService } from '../../../services/firebase-data.service';
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
  public tempstocks: any;
  public days: any;
  public wines: any;
  public table_data: any;
  public table_columns: any = ['Wines', '% Sold Through', 'Units at Store Now'];
  constructor(private aRoute: ActivatedRoute, public af: AngularFire, public ds: FirebaseDataService) {}

  ngOnInit() {
    this.sub = this.aRoute.params.subscribe(params => {
      this.id = +params['id'];
      this.store = this.ds.getStore(params['id']);
      this.stocks = this.ds.getStocks(this.id);
      this.getStockDetails();
      this.store.subscribe(da => console.log(da));
    });
  }

  getStockDetails() {
    this.stocks.subscribe(newstocks => {
      this.days = newstocks.filter((stock, index, self) => self.findIndex((t) => {return t.date === stock.date; }) === index);
      this.days = this.days.map((day) => day.date);
      this.days = this.days.reverse();
      this.wines = newstocks.filter((stock, index, self) => self.findIndex((t) => {return t.wine === stock.wine; }) === index);
      this.wines = this.wines.map((wine) => wine.wine);
      this.tempstocks = newstocks;
      this.prepareTableData();
    });
  }

  prepareTableData() {
    let oldestDate = this.days.reduce((a, b) => {return Math.min(a, b)});
    let latestDate = this.days.reduce((a, b) => {return Math.max(a, b)});
    this.table_data = [];
    this.table_columns = this.table_columns.concat(this.days);
    this.wines.forEach((wine, index) => {
      let row = [];
      row.push(wine);
      let initialStock = this.getStock(wine, oldestDate);
      let latestStock = this.getStock(wine, latestDate);
      let soldPercentange = ((latestStock - initialStock) / initialStock * 100);
      row.push(soldPercentange + '%');
      row.push(this.getStock(wine, latestDate));
      this.table_columns.forEach((column, cIndex) => {
        if (cIndex >= 3) {
          row.push(this.getStock(wine, column));
        }
      });
      this.table_data.push(row);
    });
  }

  getStock(wine, date) {
    let tempstock = this.tempstocks.filter((stock, index) => { return stock.wine === wine && stock.date === date });
    return tempstock[0].stock;
  }

}
