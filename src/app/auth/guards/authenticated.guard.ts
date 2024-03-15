import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenHandlerService } from '../services/token-handler.service';
import { catchError, map, of } from 'rxjs';
import { AuthenticateService } from '../services/authenticate.service';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const tokenService: TokenHandlerService = inject(TokenHandlerService);
  const authService: AuthenticateService = inject(AuthenticateService);
  const router: Router = inject(Router);
  const token = tokenService.getToken();

  if(!token) {
    router.navigate(['/auth/login']);
    return false;
  }

  // Validate token
  return tokenService.verifyToken(token).pipe(
    map(() => true),
    catchError(() => {
      authService.logout();
      return of(false);
    })
  );
};
