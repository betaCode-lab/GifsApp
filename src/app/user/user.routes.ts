import { Routes } from "@angular/router";
import { ProfilePageComponent } from "./pages/profile-page/profile-page.component";


export const USER_ROUTES:Routes = [
    {
        path: 'profile',
        component: ProfilePageComponent
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'profile'
    }
];