import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'login',
        loadComponent:()=>
            import('./features/account/login/login.component').then(
                (m)=> m.LoginComponent
            ),
    },

    {
        path:'register',
        loadComponent:()=>
            import('./features/account/register/register.component').then(
                (m)=> m.RegisterComponent
            ),
    },

    {
        path:'recycle-table',
        loadComponent:()=>
            import('./features/recycle/table/table.component').then(
                (m)=> m.TableComponent
            ),
    },
    {
        path:'recycle-add-center',
        loadComponent:()=>
            import('./features/recycle/add-center/add-center.component').then(
                (m)=> m.AddCenterComponent
            ),
    },
    {
        path:'voucher-points',
        loadComponent:()=>
            import('./features/voucher/recycle-points/recycle-points.component').then(
                (m)=> m.RecyclePointsComponent
            ),
    },
    {
        path:'home',
        loadComponent:()=>
            import('./features/home/home.component').then(
                (m)=> m.HomeComponent
            ),
            //canActivate: [authGuard]
    },
    {
        path:'add-center',
        loadComponent:()=>
            import('./features/recycle/add-center/add-center.component').then(
                (m)=> m.AddCenterComponent
            ),
    },
    {
        path: '**',
        redirectTo: 'login',
    },
    
    
];
