import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private cookieName = 'language';

  // Supported languages
  private supportedLanguages: string[] = ['en', 'sv'];

  // Active Section
  private activeSectionSubject = new BehaviorSubject<string>('hero');
  activeSection$ = this.activeSectionSubject.asObservable();

  // Translation/Language Logic
  private languageSubject = new BehaviorSubject<string>('en');
  language$ = this.languageSubject.asObservable();

  constructor(private translate: TranslateService,
              private cookieService: CookieService,
              private http: HttpClient,) {
    const savedLang = this.cookieService.get(this.cookieName) || 'en';
    this.translate.setDefaultLang('en');
    this.translate.use(savedLang);
    this.languageSubject.next(savedLang);
  }

  setActiveSection(section: string) {
    this.activeSectionSubject.next(section);
  }

  switchLanguage(lang: string): void {
    if (lang !== this.getCurrentLanguage()) {
      this.languageSubject.next(lang);
      this.cookieService.set(this.cookieName, lang, { expires: 365, path: '/' });
      this.translate.use(lang);
    }
  }

  getSupportedLanguages(): string[] {
    return this.supportedLanguages;
  }

  getCurrentLanguage(): string {
    return this.languageSubject.getValue();
  }

  getLinks(): Observable<any> {
    return this.http.get('/assets/links.json');
  }

}
