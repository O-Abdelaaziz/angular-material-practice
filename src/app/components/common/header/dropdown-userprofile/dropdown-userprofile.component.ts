import {Component, inject} from '@angular/core';
import {AngularMaterialModule} from '../../../../angular-material.module';
import {AppStore} from '../../../../app.store';

@Component({
  selector: 'app-dropdown-userprofile',
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: './dropdown-userprofile.component.html',
  styleUrl: './dropdown-userprofile.component.scss'
})
export class DropdownUserprofileComponent {
  appStore = inject(AppStore);

  logout() {
    this.appStore.logout();
  }
}
