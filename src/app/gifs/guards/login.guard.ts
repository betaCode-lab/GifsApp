import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../../auth/services/token.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const router:Router = inject(Router);
  const tokenService: TokenService = inject(TokenService);
  let isLoggedIn = false;

  const token = tokenService.getToken();

  if(!token) {
    isLoggedIn = false;
  } else {
    isLoggedIn = true;
  }
  
  if(isLoggedIn) {
    return true;
  }

  return router.navigate(['auth/login']);
};
