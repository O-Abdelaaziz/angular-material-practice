import {Route, Routes} from '@angular/router';
import {MenuItem, menuItems} from './interface/menu-item.type';

const itemRoute = (i: MenuItem): Route => {
  const route: Route = {path: i.route, component: i.component};
  if (i.subItems) route.children = i.subItems.map((s: MenuItem) => itemRoute(s));
  return route;
}

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  ...menuItems.map((i: MenuItem) => itemRoute(i))
];
