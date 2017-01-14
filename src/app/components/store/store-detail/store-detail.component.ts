import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { FirebaseDataService } from '../../../services/firebase-data.service';
import { LoadingBarService } from 'ng2-loading-bar';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.css']
})
export class StoreDetailComponent implements OnInit, OnDestroy {
  private id: number;
  private sub: any;
  public store: FirebaseObjectObservable<any>;
  public stocks: FirebaseListObservable<any>;
  public tempstocks: any;
  public days: any;
  public wines: any;
  public table_data: any;
  public table_columns: any = ['Wines', '% Sold Through', 'Units at Store Now'];
  constructor(private aRoute: ActivatedRoute,
              public af: AngularFire,
              public ds: FirebaseDataService,
              public loadingbar: LoadingBarService) {}

  ngOnInit() {
    this.sub = this.aRoute.params.subscribe(params => {
      this.id = +params['id'];
      this.store = this.ds.getStore(this.id);
      this.stocks = this.ds.getStocks(this.id);
      console.log('running');
      this.getStockDetails();
      this.loadingbar.start();
      
    });
    console.log('ng');
  }

  getStockDetails() {
    this.stocks.subscribe(newstocks => {
      this.days = newstocks.map((day) => day.date);
      this.days = this.days.reverse();
      this.wines = [];
      this.wines = newstocks.filter((stock, index, self) => self.findIndex((t) => {return t.wine === stock.wine; }) === index);
      this.wines = this.wines.map((wine) => wine.wine);
      console.log(newstocks);
      this.tempstocks = newstocks;
      
      if (newstocks.length === 0 ) {
        this.loadingbar.stop();
      } else
      {
        this.loadingbar.complete();
        this.prepareTableData(); }
    });
  }

  prepareTableData() {
  //  console.log(this.wines);
  //  console.log(this.days);
    
    let oldestDate = this.days.reduce((a, b) => {return Math.min(a, b)});
    oldestDate = (new Date(oldestDate)).toDateString();
    let latestDate = this.days.reduce((a, b) => {return Math.max(a, b)});
    latestDate = (new Date(latestDate)).toDateString();
    this.table_data = [];
    //console.log(this.days);
    let dateDays = this.days.map(d => { return (new Date(d)).toDateString() });
    dateDays = dateDays.filter((day, index) => dateDays.indexOf(day) === index);
 //   console.log(dateDays);
    this.table_columns = this.table_columns.concat(dateDays);
    this.wines.forEach((wine, index) => {
      let row = [];
      row.push(wine);
      let initialStock = this.getStock(wine, oldestDate);
      let latestStock = this.getStock(wine, latestDate);
      let soldPercentange = ((initialStock - latestStock) / initialStock * 100).toFixed(2);
      row.push(initialStock === 0 ? 'Not Available' :  soldPercentange + '%');
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
    let tempstock = this.tempstocks.filter((stock) => {
      return stock.wine === wine && (new Date(stock.date)).toDateString() === date;
    });
    if (tempstock[0]) {
      return tempstock[0].stock;
    } else {
      return 0;
    }
  }

  ngOnDestroy() {
    
  }

}
