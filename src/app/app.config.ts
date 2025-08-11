import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, isDevMode} from '@angular/core';
import {provideRouter, withViewTransitions} from '@angular/router';

import { routes } from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {HttpClientModule, provideHttpClient} from '@angular/common/http';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@jsverse/transloco';

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
    provideRouter(routes, withViewTransitions()), provideHttpClient(), provideTransloco({
        config: {
          availableLangs: ['en', 'fr', 'ar'],
          defaultLang: 'en',
          // Remove this option if your application doesn't support changing language in runtime.
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader
      }),]
};
