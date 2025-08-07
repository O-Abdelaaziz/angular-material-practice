import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  collapsed: WritableSignal<boolean> = signal(false);

  toggle(): void {
    this.collapsed.set(!this.collapsed());
  }

  get sidenavWidth(): string {
    return this.collapsed() ? '65px' : '250px';
  }

  get profilPicWidth(): string {
    return this.collapsed() ? '32px' : '100px';
  }
}
