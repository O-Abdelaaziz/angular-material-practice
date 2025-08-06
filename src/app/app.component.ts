import {Component, computed, effect, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AngularMaterialModule} from './angular-material.module';
import {CustomSidenavComponent} from './components/custom-sidenav/custom-sidenav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AngularMaterialModule, CustomSidenavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private collapsed = signal(false);

  public sidenavWidth = computed(() => this.isCollapsed ? '64px' : '250px');

  public isDarkMode = signal(false);

  public get isCollapsed(): boolean {
    return this.collapsed();
  }

  public toggleCollapsed(): void {
    this.collapsed.set(!this.collapsed());
  }

  toggleDarkMode() {
    this.isDarkMode.set(!this.isDarkMode());
  }

  setDarkMode = effect(() => {
    // document.body.classList.toggle('dark-mode', this.isDarkMode());
    document.documentElement.classList.toggle('dark', this.isDarkMode());
  })
}
