import { Routes } from '@angular/router';
import { Login } from './components/account/login';
import { HomePage } from './components/home/home.page';
import { AuthGuard } from './service/auth.guard';

export const routes: Routes = [
    {
        path:"",
        component: HomePage,
        canActivate: [AuthGuard]
    },
    {
        path:"Login",
        component: Login
    },
    {
        path: "**",
        redirectTo: ""
    }
];
