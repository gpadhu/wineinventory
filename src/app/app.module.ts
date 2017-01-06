import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
 
import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { StoreComponent } from './components/store/store.component';
import { WineComponent } from './components/wine/wine.component';
import { LoginComponent } from './components/login/login.component';
import { StoreDetailComponent } from './components/store/store-detail/store-detail.component';
import { WineDetailComponent } from './components/wine/wine-detail/wine-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    WineComponent,
    LoginComponent,
    StoreDetailComponent,
    WineDetailComponent,
    WineDetailComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    MaterialModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
