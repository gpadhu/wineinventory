import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';

@Injectable()
export class AuthServiceGuard implements CanActivate {

  constructor(private af: AngularFire, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.af.auth
                  .map(state => !!state)
                  .do(authenticated => {
                    if (!authenticated) {this.router.navigate(['/login']); }
                  });

  }

}
