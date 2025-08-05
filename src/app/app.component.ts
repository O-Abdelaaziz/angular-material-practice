import {Component, computed, signal} from '@angular/core';
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
  public  sidenavWidth = computed(()=> this.isCollapsed ? '64px' : '250px');

  public get isCollapsed(): boolean {
    return this.collapsed();
  }

  public toggleCollapsed(): void {
    this.collapsed.set(!this.collapsed());
  }


//   import { Renderer2, ElementRef, AfterViewInit } from '@angular/core';
//
// constructor(private renderer: Renderer2, private el: ElementRef) {}
//
// ngAfterViewInit() {
//   const drawerInner = this.el.nativeElement.querySelector('.mat-drawer-inner-container');
//   if (drawerInner) {
//     this.renderer.setStyle(drawerInner, 'overflow', 'hidden');
//   }
// }
}
