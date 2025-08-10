import {Component, input} from '@angular/core';
import {AngularMaterialModule} from '../../../angular-material.module';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent {
  loading = input<boolean>(false);
  size = input<number>(40);
}
