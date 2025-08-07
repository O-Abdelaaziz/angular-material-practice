import {Component, computed, inject, signal} from '@angular/core';
import {AngularMaterialModule} from '../../../angular-material.module';
import {MenuItem} from '../../../interface/menu-item.type';
import {SidenavService} from '../../../services/sidenav.service';
import {RouterModule, RouterOutlet} from '@angular/router';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterOutlet, RouterModule, AngularMaterialModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger('expandContractMenu', [
      transition(':enter', [
        style({opacity: 0, height: '0px'}),
        animate('250ms ease-in-out', style({opacity: 1, height: '*'})),
      ]),
      transition(':leave', [
        animate('250ms ease-in-out', style({opacity: 0, height: '0px'})),
      ]),
    ]),
  ],
})
export class SidebarComponent {
  sidenavService = inject(SidenavService);

  menuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: 'dashboard',
    },
    {
      icon: 'favorite',
      label: 'Favorites',
      route: 'favorites',
    },
    {
      icon: 'info',
      label: 'Info',
      route: 'info',
      subItems: [
        {
          icon: 'policy',
          label: 'Imprint',
          route: 'imprint',
        },
      ],
    },
  ]);

  sidenavWidth = computed(() => this.sidenavService.sidenavWidth);
  profilePicSize = computed(() => this.sidenavService.profilPicWidth);
  isCollapsed = computed(() => this.sidenavService.collapsed());

  nestedMenuOpenIndex = signal<number | null>(null);

  isNestedMenuOpen(index: number): boolean {
    return this.nestedMenuOpenIndex() === index;
  }

  toggleNested(index: number): void {
    this.nestedMenuOpenIndex() === index
      ? this.nestedMenuOpenIndex.set(null)
      : this.nestedMenuOpenIndex.set(index);
  }
}
