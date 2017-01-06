import { Component } from '@angular/core';
import { MdMenuModule} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public primary: boolean = true;

}
