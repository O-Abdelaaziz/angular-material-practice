import {computed, effect, Injectable, signal} from '@angular/core';
import {Widget} from '../interface/dashboard';
import {SubscribersComponent} from '../pages/dashboard/widgets/subscribers/subscribers.component';
import {ViewsComponent} from '../pages/dashboard/widgets/views/views.component';
import {WatchTimeComponent} from '../pages/dashboard/widgets/watch-time/watch-time.component';
import {RevenueComponent} from '../pages/dashboard/widgets/revenue/revenue.component';

@Injectable()
export class DashboardService {

  public widgets = signal<Widget[]>(
    [
      {
        id: 1,
        label: 'Subscribers',
        content: SubscribersComponent,
        rows: 1,
        columns: 1,
        backgroundColor: '#003f5c',
        color: 'whitesmoke'
      },
      {
        id: 2,
        label: 'Views',
        content: ViewsComponent,
        rows: 1,
        columns: 1,
        backgroundColor: '#003f5c',
        color: 'whitesmoke'
      },
      {
        id: 3,
        label: 'Watch time',
        content: WatchTimeComponent,
        rows: 1,
        columns: 1,
        backgroundColor: '#003f5c',
        color: 'whitesmoke'
      },
      {
        id: 4,
        label: 'Revenue',
        content: RevenueComponent,
        rows: 1,
        columns: 1,
        backgroundColor: '#003f5c',
        color: 'whitesmoke'
      }
    ]
  );

  constructor() {
    this.fetchWidgets();
  }

  public fetchWidgets() {
    const widgetsAsString = localStorage.getItem('widgets');
    if (widgetsAsString) {
      //this.widgets.set(JSON.parse(widgetsAsString));
      const widgets = JSON.parse(widgetsAsString) as Widget[];
      //this.widgets.set(widgets);
      widgets.forEach(widget => {
        const content = this.widgets().find(w => w.id === widget.id)?.content;
        if (content) {
          widget.content = content;
        }
      });
      this.addedWidgets.set(widgets);
    }
  }

  public addedWidgets = signal<Widget[]>([]);

  public widgetsToAdd = computed(() => {
    const addedIds = this.addedWidgets().map(widget => widget.id);
    return this.widgets().filter(widget => !addedIds.includes(widget.id));
  })

  public addWidget(widget: Widget) {
    this.addedWidgets.set([...this.addedWidgets(), {...widget}])
  }

  public updateWidget(id: number, widget: Partial<Widget>) {
    const index = this.addedWidgets().findIndex(w => w.id === id);
    if (index !== -1) {
      const newWidgets = [...this.addedWidgets()];
      newWidgets[index] = {...newWidgets[index], ...widget};
      this.addedWidgets.set(newWidgets);
    }
    // this.addedWidgets.set(this.addedWidgets().map(w => w.id === id ? {...w, ...widget} : w));
  }

  public moveWidgetToRight(id: number) {
    const index = this.addedWidgets().findIndex(w => w.id === id);
    if (index !== -1) {
      const newWidgets = [...this.addedWidgets()];
      newWidgets.splice(index, 1);
      newWidgets.splice(index + 1, 0, this.addedWidgets()[index]);
      this.addedWidgets.set(newWidgets);
    }
  }

  public moveWidgetToRightOld(id: number) {
    const index = this.addedWidgets().findIndex(w => w.id === id);
    if (index === this.addedWidgets().length - 1) {
      return;
    }
    const newWidgets = [...this.addedWidgets()];
    [newWidgets[index], newWidgets[index + 1]] = [{...newWidgets[index + 1]}, {...newWidgets[index]}];
    this.addedWidgets.set(newWidgets);
  }

  public moveWidgetToLeft(id: number) {
    const index = this.addedWidgets().findIndex(w => w.id === id);
    if (index !== -1) {
      const newWidgets = [...this.addedWidgets()];
      newWidgets.splice(index, 1);
      newWidgets.splice(index - 1, 0, this.addedWidgets()[index]);
      this.addedWidgets.set(newWidgets);
    }
  }

  public moveWidgetToLeftOld(id: number) {
    const index = this.addedWidgets().findIndex(w => w.id === id);
    if (index === 0) {
      return;
    }
    const newWidgets = [...this.addedWidgets()];
    [newWidgets[index], newWidgets[index - 1]] = [{...newWidgets[index - 1]}, {...newWidgets[index]}];
    this.addedWidgets.set(newWidgets);
  }

  public deleteWidget(id: number) {
    this.addedWidgets.set(this.addedWidgets().filter(w => w.id !== id));
  }

  public saveWidgets = effect(() => {
    const widgetsWithoutContent: Partial<Widget>[] = this.addedWidgets().map(w => ({...w}));
    widgetsWithoutContent.forEach(w => delete w.content);
    localStorage.setItem('widgets', JSON.stringify(widgetsWithoutContent));
  })


  insertWidgetAtPosition(sourceWidgetId: number, destWidgetId: number) {
    const widgetToAdd = this.widgetsToAdd().find((w) => w.id === sourceWidgetId);
    if(!widgetToAdd) {
      return;
    }
    const indexOfDestWidget = this.addedWidgets().findIndex((w) => w.id === destWidgetId);
    const positionToAdd = indexOfDestWidget === -1 ? this.addedWidgets().length : indexOfDestWidget;

    const newWidgets = [...this.addedWidgets()];
    newWidgets.splice(positionToAdd, 0, widgetToAdd);
    this.addedWidgets.set(newWidgets);
  }
  

  updateWidgetPosition(sourceWidgetId: number, targetWidgetId: number) {
    const sourceIndex = this.addedWidgets().findIndex((w) => w.id === sourceWidgetId);
    if(sourceIndex === -1) {
      return;
    }
    const newWidgets = [...this.addedWidgets()];
    const sourceWidget = newWidgets.splice(sourceIndex, 1)[0];
    const targetIndex = newWidgets.findIndex((w) => w.id === targetWidgetId);
    if(targetIndex === -1) {
      return;
    }
    const insertAt = targetIndex === sourceIndex ? targetIndex + 1 : targetIndex;

    newWidgets.splice(insertAt, 0, sourceWidget);
    this.addedWidgets.set(newWidgets);
  }
}
