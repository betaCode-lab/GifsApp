import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { inject } from '@angular/core';
import { TokenHandlerService } from '../services/token-handler.service';

export const tokenValidatorGuard: CanActivateFn = (route, state) => {
  const tokenService: TokenHandlerService = inject(TokenHandlerService);
  const router: Router = inject(Router);
  
  const {token} = route.params;

  if(!token) {
    router.navigate(['/auth/reset-password']);
    return false;
  }

  // Validate token
  return tokenService.verifyToken(token).pipe(
    map(() => true),
    catchError(() => {
      router.navigate(['/auth/reset-password']);
      return of(false);
    })
  );
};
