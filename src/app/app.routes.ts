import { Routes } from '@angular/router';
import { StoreComponent } from './components/store/store.component';
import { WineComponent } from './components/wine/wine.component';
import { LoginComponent } from './components/login/login.component';
import { StoreDetailComponent } from './components/store/store-detail/store-detail.component';
import { WineDetailComponent  } from './components/wine/wine-detail/wine-detail.component';
export const appRoutes: Routes = [
    { path: '', component: StoreComponent, pathMatch: 'full' },
    { path: 'store', component: StoreComponent, pathMatch: 'full'  },
    { path: 'store/:id', component: StoreDetailComponent },
    { path: 'wine', component: WineComponent, pathMatch: 'full' },
    { path: 'wine/:id', component: WineDetailComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LoginComponent }
];