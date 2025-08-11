import {Component, ElementRef, inject, OnInit, signal, viewChild} from '@angular/core';
import {WidgetComponent} from '../../components/widget/widget.component';
import {DashboardService} from '../../services/dashboard.service';
import {AngularMaterialModule} from '../../angular-material.module';
import {Widget} from '../../interface/dashboard';
import {wrapGrid} from 'animate-css-grid';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {WidgetsPanelComponent} from './widgets-panel/widgets-panel.component';
import {TranslocoPipe} from '@jsverse/transloco';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [WidgetComponent, AngularMaterialModule, WidgetsPanelComponent, TranslocoPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {

  public store = inject(DashboardService);
  public widgetsOpen = signal(false);

  public onAddWidget(widget: Widget) {
    this.store.addWidget(widget);
  }

  public dashboard = viewChild.required<ElementRef>('dashboard');

  ngOnInit(): void {
    wrapGrid(this.dashboard().nativeElement, {duration: 300});
  }

  protected readonly ondrop = ondrop;

  drop(event: CdkDragDrop<number, any>) {
    const {
      previousContainer,
      container,
      item: {data},
    } = event;

    if (data) {
      this.store.insertWidgetAtPosition(data, container.data);
      return;
    }

    this.store.updateWidgetPosition(previousContainer.data, container.data);
  }

  public toggleWidgetsPanel() {
    this.widgetsOpen.set(!this.widgetsOpen());
  }

  widgetPutPack($event: CdkDragDrop<number, any>) {
    const {previousContainer} = $event;
    this.store.deleteWidget(previousContainer.data);
    // if (previousContainer) {
    //   this.store.deleteWidget(previousContainer.data);
    // }
  }
}
