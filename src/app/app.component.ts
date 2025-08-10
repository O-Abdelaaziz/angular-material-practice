import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'facebook', this.domSanitizer.bypassSecurityTrustResourceUrl('./facebook-svg.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'google', this.domSanitizer.bypassSecurityTrustResourceUrl('./google-svg.svg'),
    );
  }
}
