import {Component, effect, inject, model, signal} from '@angular/core';
import {AngularMaterialModule} from '../../../angular-material.module';
import {SidenavService} from '../../../services/sidenav.service';
import {AppStore} from '../../../app.store';
import {DropdownUserprofileComponent} from './dropdown-userprofile/dropdown-userprofile.component';
import {DropdownLangComponent} from './dropdown-lang/dropdown-lang.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AngularMaterialModule, DropdownUserprofileComponent, DropdownLangComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  appStore = inject(AppStore);

  sidenavService = inject(SidenavService);

  collapsed = model.required<boolean>();

  public get isCollapsed(): boolean {
    return this.collapsed();
  }

  public toggleCollapsed(): void {
    this.collapsed.set(!this.collapsed());
  }

  // public toggleSidenav(): void {
  //   this.sidenavService.toggle();
  // }

  public isDarkMode = signal(false);

  public toggleDarkMode() {
    this.isDarkMode.set(!this.isDarkMode());
  }

  private setDarkMode = effect(() => {
    document.documentElement.classList.toggle('dark', this.isDarkMode());
  })
}
