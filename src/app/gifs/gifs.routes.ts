import { Routes } from "@angular/router";

import { HomePageComponent } from "./pages/home-page/home-page.component";

export const GIFS_ROUTES:Routes = [
    {
        path: 'home',
        component: HomePageComponent
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    }
];