import {Component, ElementRef, inject, OnInit, viewChild} from '@angular/core';
import {WidgetComponent} from '../../components/widget/widget.component';
import {DashboardService} from '../../services/dashboard.service';
import {AngularMaterialModule} from '../../angular-material.module';
import {Widget} from '../../interface/dashboard';
import {wrapGrid} from 'animate-css-grid';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [WidgetComponent, AngularMaterialModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {

  store = inject(DashboardService);

  public onAddWidget(widget: Widget) {
    this.store.addWidget(widget);
  }

  public dashboard = viewChild.required<ElementRef>('dashboard');

  ngOnInit(): void {
    wrapGrid(this.dashboard().nativeElement, {duration: 300});
  }
}
