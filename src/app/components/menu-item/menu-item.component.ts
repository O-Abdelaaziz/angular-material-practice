import {Component, computed, inject, Input, input, signal} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AngularMaterialModule} from '../../angular-material.module';
import {CommonModule} from '@angular/common';
import {animate, style, transition, trigger} from '@angular/animations';
import {MenuItem} from '../../interface/menu-item.type';
import {I18nService} from '../../services/i18n.service';
import {TranslocoDirective} from '@jsverse/transloco';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [CommonModule, RouterModule, AngularMaterialModule, TranslocoDirective],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss',
  animations: [
    trigger('expandContractMenu', [
      transition(':enter', [
        style({opacity: 0, height: 0}),
        animate('500ms ease-in-out', style({opacity: 1, height: '*'}))
      ]),
      transition(':leave', [
        animate('500ms ease-in-out', style({opacity: 0, height: 0})),
        // style({opacity: 1, height: '*'})
      ])
    ])
  ]
})
export class MenuItemComponent {
  public item = input.required<MenuItem>();
  public collapsed = input(false);
  public nestedMenuOpen = signal(false);
  public routeHistory = input<string>('');
  public level = computed(() => this.routeHistory().split('/').length - 1);
  public indentation = computed(() => this.collapsed() ? '16px' : `${(16 + (this.level() * 16))}px`);

  public i18n = inject(I18nService);
  public selectedItemId: string | null = null;

  public toggleNested() {
    if (!this.item().subItems) return;
    this.nestedMenuOpen.set(!this.nestedMenuOpen());
  }

  @Input() direction: 'ltr' | 'rtl' = 'ltr';

}
