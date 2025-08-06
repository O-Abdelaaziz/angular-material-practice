import {Component, inject} from '@angular/core';
import {AngularMaterialModule} from '../../../angular-material.module';
import {DashboardService} from '../../../services/dashboard.service';

@Component({
  selector: 'app-widgets-panel',
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: './widgets-panel.component.html',
  styleUrl: './widgets-panel.component.scss'
})
export class WidgetsPanelComponent {
  public store = inject(DashboardService);
}
