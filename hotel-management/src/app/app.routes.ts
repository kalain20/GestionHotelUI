import { Routes } from "@angular/router";
 export const routes: Routes = [
    {
        path:'dashboard',
        loadChildren: ()=>import('./pages/dashboard/dashboard.routes').then(m=>m.DASHBOARD),
        title:''
    },
     {
        path:'chambres',
        loadChildren: ()=>import('./pages/chambres/chambres.routes').then(m=>m.CHAMBRES),
        title:''
    },
     {
        path:'entrees-sorties',
        loadChildren: ()=>import('./pages/entrees-sorties/entrees-sorties.routes').then(m=>m.ENTREES_SORTIES),
        title:''
    },
    {
        path:'facturation',
        loadChildren: () => import('./pages/facturation/facturation.routes').then(m=>m.FACTURATION),
        title:''
    },
    {
        path:'clients',
        loadChildren: () => import('./pages/clients/clients.routes').then(m=>m.CLIENTS),
        title:''
    },
    {
        path:'reservations',
        loadChildren: () => import('./pages/reservations/reservations.routes').then(m=>m.RESERVATIONS),
        title:''
    },
    {
        path:'rapports',
        loadChildren: () => import('./pages/rapports/rapports.routes').then(m=>m.RAPPORT),
        title:''
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      }

]