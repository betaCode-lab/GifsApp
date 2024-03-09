import { Routes } from '@angular/router';
import { CreateUserPageComponent } from './auth/pages/create-user-page/create-user-page.component';
import { loginGuard } from './gifs/guards/login.guard';
import { LayoutMainComponent } from './shared/layouts/layout-main/layout-main.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';

export const routes: Routes = [
    {
        path: 'auth',
        data: { showSidebar: false },
        children: [
            {
                path: 'login',
                component: LoginPageComponent,
                title: 'Login'
            },
            {
                path: 'create',
                component: CreateUserPageComponent,
                title: 'Register'
            }
        ]
    },
    {
        path: 'gifs',
        component: LayoutMainComponent,
        data: { showSidebar: true },
        canActivate: [loginGuard],
        loadChildren: () => import('./gifs/gifs.routes').then(r => r.GIFS_ROUTES)
    },
    {
        path: 'user',
        data: { showSideBar: true },
        canActivate: [loginGuard],
        loadChildren: () => import('./user/user.routes').then(r => r.USER_ROUTES)
    },
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    }
];
