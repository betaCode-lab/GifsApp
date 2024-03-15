import { Routes } from "@angular/router";
import { ProfileComponent } from "./pages/profile/profile.component";

export const ACCOUNT_ROUTES:Routes = [
    { 
        path: 'profile', 
        component: ProfileComponent, 
        title: 'Profile' 
    },
    { path: '', pathMatch: 'full', redirectTo: 'profile' }
];