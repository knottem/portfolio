import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private cookieName = 'language';

  constructor(private translate: TranslateService, private cookieService: CookieService) {
    // Load saved language from the cookie
    const savedLang = this.cookieService.get(this.cookieName) || 'en';
    this.translate.use(savedLang);
  }

  // Switch the current language
  switchLanguage(lang: string): void {
    this.translate.use(lang);
    this.cookieService.set(this.cookieName, lang, { expires: 365, path: '/' });
  }

  // Get the currently active language
  getCurrentLanguage(): string {
    return this.translate.currentLang;
  }
}
