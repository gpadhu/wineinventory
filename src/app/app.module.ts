import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { StoreComponent } from './components/store/store.component';
import { WineComponent } from './components/wine/wine.component';
import { LoginComponent } from './components/login/login.component';
import { StoreDetailComponent } from './components/store/store-detail/store-detail.component';
import { WineDetailComponent } from './components/wine/wine-detail/wine-detail.component';
import { firebaseConfig, firebaseAuthConfig } from './app.firebase';
import { AuthServiceGuard } from './auth-service.guard';
import { HeaderComponent } from './components/header/header.component';
import { FirebaseDataService } from './services/firebase-data.service';
import { SearchPipe } from './pipes/search.pipe';
import { WineSearchPipe } from './pipes/wine-search.pipe';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NotificationService } from './services/notification.service';
@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    WineComponent,
    LoginComponent,
    StoreDetailComponent,
    WineDetailComponent,
    HeaderComponent,
    SearchPipe,
    WineSearchPipe
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    BrowserModule,
    FormsModule,
    HttpModule,
    SimpleNotificationsModule
  ],
  providers: [ AuthServiceGuard, FirebaseDataService, NotificationService  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
