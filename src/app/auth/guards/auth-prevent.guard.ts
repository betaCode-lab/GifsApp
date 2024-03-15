import { CanActivateFn, Router } from '@angular/router';
import { TokenHandlerService } from '../services/token-handler.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { AuthenticateService } from '../services/authenticate.service';

export const authPreventGuard: CanActivateFn = (route, state) => {
  const tokenService:TokenHandlerService = inject(TokenHandlerService);
  const router:Router = inject(Router);
  const authService:AuthenticateService = inject(AuthenticateService);

  const token = tokenService.getToken();

  if(token) {
    // Validate token
    return tokenService.verifyToken(token).pipe(
      map(() => {
        router.navigate(['/gifs/home']); 
        return false;
      }),
      catchError(() => {
        authService.logout();
        router.navigate(['/auth/login']); 
        return of(true);
      })
    );
  } else {
    return true;
  }
};
