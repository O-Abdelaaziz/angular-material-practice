import {Component, inject, input, model} from '@angular/core';
import {AngularMaterialModule} from '../../../angular-material.module';
import {Widget} from '../../../interface/dashboard';
import {DashboardService} from '../../../services/dashboard.service';

@Component({
  selector: 'app-widget-options',
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: './widget-options.component.html',
  styleUrl: './widget-options.component.scss'
})
export class WidgetOptionsComponent {
  public data = input.required<Widget>();
  public showOptions = model<boolean>(false);
  public store = inject(DashboardService);

  public closeOptions() {
    this.showOptions.set(false);
  }
}
