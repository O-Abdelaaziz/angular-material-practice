import {Component, computed, signal} from '@angular/core';
import {AngularMaterialModule} from '../../../angular-material.module';
import {CustomSidenavComponent} from '../../../components/custom-sidenav/custom-sidenav.component';
import {HeaderComponent} from '../../../components/common/header/header.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [AngularMaterialModule, CustomSidenavComponent, HeaderComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  public collapsed = signal(false);
  public sidenavWidth = computed(() => this.collapsed() ? '64px' : '250px');
}
