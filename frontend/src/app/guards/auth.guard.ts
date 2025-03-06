import { AuthService } from '../services/auth.service';

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isLoggedIn = !!localStorage.getItem('token'); // Check if the token exists

    // If the user is logged in, he does not enter login or signup
    if (isLoggedIn && (state.url === '/login' || state.url === '/signup')) {
      this.router.navigate(['/home']);
      return false;
    }

    // If the user is not logged in, he only enters aboutUs, but he will be redirected to login if he tries to enter any other page
    if (
      !isLoggedIn &&
      state.url !== '/aboutUs' &&
      state.url !== '/login' &&
      state.url !== '/signup'
    ) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
