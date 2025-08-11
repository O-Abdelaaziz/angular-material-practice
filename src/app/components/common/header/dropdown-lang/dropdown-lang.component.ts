import {Component, inject} from '@angular/core';
import {AngularMaterialModule} from '../../../../angular-material.module';
import {TranslocoDirective} from '@jsverse/transloco';
import {I18nService} from '../../../../services/i18n.service';
import {NgClass} from '@angular/common';

export const LANGUAGES: { code: 'en' | 'fr' | 'ar', labelKey: string, icon: string }[] = [
  {code: 'en', labelKey: 'language.english', icon: 'english'},
  {code: 'fr', labelKey: 'language.french', icon: 'french'},
  {code: 'ar', labelKey: 'language.arabic', icon: 'arabic'},
];

@Component({
  selector: 'app-dropdown-lang',
  standalone: true,
  imports: [AngularMaterialModule, TranslocoDirective, NgClass],
  templateUrl: './dropdown-lang.component.html',
  styleUrl: './dropdown-lang.component.scss'
})
export class DropdownLangComponent {
  public i18n = inject(I18nService);
  protected readonly LANGUAGES = LANGUAGES;
}
