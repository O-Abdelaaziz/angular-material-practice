import {Type} from '@angular/core';
import {PageComponent} from '../pages/page/page.component';
import {DashboardComponent} from '../pages/dashboard/dashboard.component';
import {FormsComponent} from '../pages/forms/forms.component';

export type MenuItem = {
  icon: string,
  label: string,
  route?: string,
  extraInfo?: boolean
  subItems?: MenuItem[],
  component?: Type<unknown>
}

export const menuItems: MenuItem[] = [
  {
    icon: 'dashboard',
    label: 'home',
    route: 'dashboard',
    extraInfo: false,
    component: DashboardComponent
  },
  {
    icon: 'video_library',
    label: 'Content',
    route: 'content',
    extraInfo: false,
    component: PageComponent,
    subItems: [
      {
        icon: 'play_circle',
        label: 'Videos',
        route: 'content/videos',
        extraInfo: false,
        component: PageComponent,
        subItems: [
          {
            icon: 'add',
            label: 'Add',
            route: 'content/videos/add',
            extraInfo: false,
            component: PageComponent,
          },
          {
            icon: 'edit',
            label: 'Edit',
            route: 'content/videos/edit',
            extraInfo: false,
            component: PageComponent,
          },
          {
            icon: 'visibility',
            label: 'View',
            route: 'content/videos/view',
            extraInfo: false,
            component: PageComponent,
          }
        ]
      },
      {
        icon: 'playlist_play',
        label: 'Playlists',
        route: 'content/playlists',
        extraInfo: false,
        component: PageComponent,
      },
      {
        icon: 'post_add',
        label: 'Create',
        route: 'content/create',
        extraInfo: false,
        component: PageComponent,
      },
      {
        icon: 'edit',
        label: 'Edit',
        route: 'content/edit',
        extraInfo: false,
        component: PageComponent,
      },
      {
        icon: 'visibility',
        label: 'View',
        route: 'content/view',
        component: PageComponent,
      }
    ]
  },
  {
    icon: 'analytics',
    label: 'Analytics',
    route: 'analytics',
    extraInfo: true,
    component: PageComponent,
  },
  {
    icon: 'comments',
    label: 'Comments',
    route: 'comments',
    extraInfo: false,
    component: PageComponent,
  },
  {
    icon: 'library_books',
    label: 'forms',
    route: 'forms',
    extraInfo: false,
    component: FormsComponent,
  },
  {
    icon: 'settings',
    label: 'Settings',
    route: 'settings',
    extraInfo: false,
    component: PageComponent,
  }
];
