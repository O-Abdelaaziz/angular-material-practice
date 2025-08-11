import {computed, inject, Injectable, signal} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {TranslocoService} from '@jsverse/transloco';
import {Directionality} from '@angular/cdk/bidi';
import {LANGUAGES} from '../components/common/header/dropdown-lang/dropdown-lang.component';

const LANG_STORAGE_KEY = 'app-lang';

@Injectable({
  providedIn: 'root'
})
export class I18nService {

  public readonly languages = LANGUAGES;

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
    localStorage.setItem(LANG_STORAGE_KEY, lang);

    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    this.document.documentElement.dir = dir;
    this.document.documentElement.lang = lang;
    this.dir.change.emit(dir);
    // this.document.documentElement.classList.toggle('rtl-font', lang === 'ar');
  }

  constructor() {
    const savedLang = localStorage.getItem(LANG_STORAGE_KEY) as 'en' | 'fr' | 'ar' | null;
    const defaultLang = savedLang ?? 'en';
    this.setLanguage(defaultLang);
  }
}
