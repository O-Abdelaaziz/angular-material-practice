import {Component, computed, Input, signal} from '@angular/core';
import {AngularMaterialModule} from '../../angular-material.module';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MenuItemComponent} from '../menu-item/menu-item.component';

export type MenuItem = {
  icon: string,
  label: string,
  route?: string,
  extraInfo?: boolean
  subItems?: MenuItem[],
}

@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    MenuItemComponent
  ],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.scss'
})
export class CustomSidenavComponent {
  sideNavCollapsed = signal(false);

  @Input() set collapsed(value: boolean) {
    this.sideNavCollapsed.set(value);
  }

  profilePictureSize = computed(() => this.sideNavCollapsed() ? '32' : '92');
  profileBorderSize = computed(() => this.sideNavCollapsed() ? '1px' : '2px')

  public menuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: 'dashboard',
      extraInfo: false
    },
    {
      icon: 'video_library',
      label: 'Content',
      route: 'content',
      extraInfo: false,
      subItems: [
        {
          icon: 'play_circle',
          label: 'Videos',
          route: 'content/videos',
          extraInfo: false,
          subItems: [
            {
              icon: 'add',
              label: 'Add',
              route: 'content/videos/add',
              extraInfo: false
            },
            {
              icon: 'edit',
              label: 'Edit',
              route: 'content/videos/edit',
              extraInfo: false
            },
            {
              icon: 'visibility',
              label: 'View',
              route: 'content/videos/view',
              extraInfo: false
            }
          ]
        },
        {
          icon: 'playlist_play',
          label: 'Playlists',
          route: 'content/playlists',
          extraInfo: false
        },
        {
          icon: 'post_add',
          label: 'Create',
          route: 'content/create',
          extraInfo: false
        },
        {
          icon: 'edit',
          label: 'Edit',
          route: 'content/edit',
          extraInfo: false
        },
        {
          icon: 'visibility',
          label: 'View',
          route: 'content/view'
        }
      ]
    },
    {
      icon: 'analytics',
      label: 'Analytics',
      route: 'analytics',
      extraInfo: true
    },
    {
      icon: 'comments',
      label: 'Comments',
      route: 'comments',
      extraInfo: false
    },
    {
      icon: 'settings',
      label: 'Settings',
      route: 'settings',
      extraInfo: false,
    }
  ]);
}
