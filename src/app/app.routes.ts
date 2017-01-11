import { Routes, CanActivate } from '@angular/router';
import { StoreComponent } from './components/store/store.component';
import { WineComponent } from './components/wine/wine.component';
import { LoginComponent } from './components/login/login.component';
import { StoreDetailComponent } from './components/store/store-detail/store-detail.component';
import { WineDetailComponent  } from './components/wine/wine-detail/wine-detail.component';
import { AuthServiceGuard } from './auth-service.guard';
export const appRoutes: Routes = [
    { path: '', redirectTo: 'store', pathMatch: 'full' },
    { path: 'store', component: StoreComponent, pathMatch: 'full', canActivate: [AuthServiceGuard]  },
    { path: 'store/:id', component: StoreDetailComponent, canActivate: [AuthServiceGuard] },
    { path: 'wine', component: WineComponent, pathMatch: 'full', canActivate: [AuthServiceGuard] },
    { path: 'wine/:id', component: WineDetailComponent, canActivate: [AuthServiceGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LoginComponent }
];