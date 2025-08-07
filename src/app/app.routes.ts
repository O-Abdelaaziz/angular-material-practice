import {Route, Routes} from '@angular/router';
import {MenuItem} from './interface/menu-item.type';
import {redirectDashboardIfAuthenticated, redirectLoginIfNotAuthenticated} from './guards/auth.guard';

const itemRoute = (i: MenuItem): Route => {
  const route: Route = {path: i.route, component: i.component};
  if (i.subItems) route.children = i.subItems.map((s: MenuItem) => itemRoute(s));
  return route;
}

// export const routes: Routes = [
//   {
//     path: '',
//     pathMatch: 'full',
//     redirectTo: 'dashboard'
//   },
//   ...menuItems.map((i: MenuItem) => itemRoute(i))
// ];

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(l => l.LoginComponent),
    canActivate: [redirectDashboardIfAuthenticated()]
  },

  {
    path: '',
    loadComponent: () => import('./shared/components/layout/layout.component').then(l => l.LayoutComponent),
    canActivate: [redirectLoginIfNotAuthenticated()],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(d => d.DashboardComponent)
      }
    ]
  }
];
