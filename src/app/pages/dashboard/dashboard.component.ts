import {Component, inject} from '@angular/core';
import {WidgetComponent} from '../../components/widget/widget.component';
import {DashboardService} from '../../services/dashboard.service';
import {AngularMaterialModule} from '../../angular-material.module';
import {Widget} from '../../interface/dashboard';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [WidgetComponent, AngularMaterialModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [DashboardService]
})
export class DashboardComponent {

  store = inject(DashboardService);

  public onAddWidget(widget: Widget) {
    this.store.addWidget(widget);
  }
}
