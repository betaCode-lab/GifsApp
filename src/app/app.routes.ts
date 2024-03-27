import { authenticatedGuard } from './auth/guards/authenticated.guard';
import { authPreventGuard } from './auth/guards/auth-prevent.guard';
import { CreateAccountPageComponent } from './auth/pages/create-account-page/create-account-page.component';
import { LayoutMainComponent } from './shared/layouts/layout-main/layout-main.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { Routes } from '@angular/router';
import { ResetPasswordComponent } from './auth/pages/reset-password/reset-password.component';
import { ChangePasswordComponent } from './auth/pages/change-password/change-password.component';
import { tokenValidatorGuard } from './auth/guards/token-validator.guard';

export const routes: Routes = [
    {
        path: 'auth',
        data: { showSidebar: false },
        children: [
            {
                path: 'login',
                component: LoginPageComponent,
                canActivate: [authPreventGuard],
                title: 'Login'
            },
            {
                path: 'create',
                component: CreateAccountPageComponent,
                canActivate: [authPreventGuard],
                title: 'Register'
            },
            {
                path: 'reset-password',
                component: ResetPasswordComponent,
                canActivate: [authPreventGuard],
                title: 'Reset Password'
            },
            {
                path: 'change-password/:token',
                component: ChangePasswordComponent,
                canActivate: [
                    authPreventGuard,
                    tokenValidatorGuard
                ],
                title: 'Change Password'
            }
        ]
    },
    {
        path: 'gifs',
        component: LayoutMainComponent,
        canActivate: [authenticatedGuard],
        data: { 
            showSidebar: true,
            showHistory: true
        },
        loadChildren: () => import('./gifs/gifs.routes').then(r => r.GIFS_ROUTES)
    },
    {
        path: 'account',
        component: LayoutMainComponent,
        canActivate: [authenticatedGuard],
        data: { 
            showSidebar: true,
            showHistory: false
        },
        loadChildren: () => import('./account/account.routes').then(r => r.ACCOUNT_ROUTES)
    },
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    }
];
