import {Component, computed, inject, signal} from '@angular/core';
import {AngularMaterialModule} from '../../../angular-material.module';
import {CustomSidenavComponent} from '../../../components/custom-sidenav/custom-sidenav.component';
import {HeaderComponent} from '../../../components/common/header/header.component';
import {RouterOutlet} from '@angular/router';
import {AppStore} from '../../../app.store';
import {ProgressBarComponent} from '../progress-bar/progress-bar.component';

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
}
