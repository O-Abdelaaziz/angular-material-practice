import {Component, input, OnInit, signal} from '@angular/core';
import {Widget} from '../../interface/dashboard';
import {NgComponentOutlet} from '@angular/common';
import {AngularMaterialModule} from '../../angular-material.module';
import {WidgetOptionsComponent} from './widget-options/widget-options.component';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [NgComponentOutlet, AngularMaterialModule, WidgetOptionsComponent],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.scss',
  host: {
    '[style.grid-area]': '"span " + (data().rows ?? 1) + " / span " + (data().columns ?? 1)'
  }
})
export class WidgetComponent implements OnInit {
  public data = input.required<Widget>();
  public showOptions = signal(false);
  public loading = signal(false);

  ngOnInit(): void {
    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
    }, 5000);
  }
}
