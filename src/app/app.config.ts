import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withViewTransitions} from '@angular/router';

import { routes } from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {HttpClientModule, provideHttpClient} from '@angular/common/http';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideNativeDateAdapter(),
    importProvidersFrom(HttpClientModule),
    provideNativeDateAdapter(),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
        floatLabel: 'never',
        subscriptSizing: 'dynamic',
      },
    },
    provideRouter(routes, withViewTransitions()),]
};
