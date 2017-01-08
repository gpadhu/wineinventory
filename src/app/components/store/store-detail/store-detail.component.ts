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
      console.log(this.id);
    });

    this.stocks.subscribe(sn => {
      console.log(sn);
    });
  }

}
