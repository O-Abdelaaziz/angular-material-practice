import {computed, inject, Injectable, signal} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {TranslocoService} from '@jsverse/transloco';
import {Directionality} from '@angular/cdk/bidi';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  // private document = inject(DOCUMENT);
  // private translocoService = inject(TranslocoService);
  // private dir = inject(Directionality);
  //
  // setLanguage(lang: 'en' | 'fr' | 'ar') {
  //   this.translocoService.setActiveLang(lang);
  //   const direction = lang === 'ar' ? 'rtl' : 'ltr';
  //   this.document.documentElement.dir = direction;
  //   this.document.documentElement.lang = lang;
  //   this.dir.change.emit(direction);
  // }
  //
  // get currentLang() {
  //   return this.translocoService.getActiveLang();
  // }

  private document = inject(DOCUMENT);
  private translocoService = inject(TranslocoService);
  private dir = inject(Directionality);

  // Signal to track current language
  public currentLang = signal<'en' | 'fr' | 'ar'>('en');

  // Reactive direction signal
  public direction = computed(() => this.currentLang() === 'ar' ? 'rtl' : 'ltr');

  // Reactive sidenav position signal
  //public sidenavPosition = computed(() => this.currentLang() === 'ar' ? 'end' : 'start');

  setLanguage(lang: 'en' | 'fr' | 'ar') {
    this.translocoService.setActiveLang(lang);
    this.currentLang.set(lang);

    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    this.document.documentElement.dir = dir;
    this.document.documentElement.lang = lang;
    this.dir.change.emit(dir);
  }
}
