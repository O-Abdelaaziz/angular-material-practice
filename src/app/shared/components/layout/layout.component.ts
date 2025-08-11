import {Component, computed, effect, inject, signal} from '@angular/core';
import {AngularMaterialModule} from '../../../angular-material.module';
import {CustomSidenavComponent} from '../../../components/custom-sidenav/custom-sidenav.component';
import {HeaderComponent} from '../../../components/common/header/header.component';
import {RouterOutlet} from '@angular/router';
import {AppStore} from '../../../app.store';
import {ProgressBarComponent} from '../progress-bar/progress-bar.component';
import {I18nService} from '../../../services/i18n.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [AngularMaterialModule, CustomSidenavComponent, HeaderComponent, RouterOutlet, ProgressBarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  public collapsed = signal(false);
  public sidenavWidth = computed(() => this.collapsed() ? '64px' : '250px');

  public appStore = inject(AppStore);
  public i18n = inject(I18nService);

  public marginLeft = computed(() =>
    this.i18n.direction() === 'rtl' ? '0' : this.sidenavWidth()
  );

  public marginRight = computed(() =>
    this.i18n.direction() === 'rtl' ? this.sidenavWidth() : '0'
  );

  constructor() {
    effect(() => {
      console.log('Collapsed:', this.collapsed());
      console.log('Sidenav Width:', this.sidenavWidth());
      console.log('Direction:', this.i18n.direction());
      console.log('Margin Left:', this.marginLeft());
      console.log('Margin Right:', this.marginRight());
    });
  }

  public contentMarginStyle = computed(() => {
    const width = this.sidenavWidth();
    const dir = this.i18n.direction();

    return { ...(dir === 'rtl'
        ? { 'margin-right': width, 'margin-left': '0' }
        : { 'margin-left': width, 'margin-right': '0' }) };
  });

}
