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
  private defaultLanguage: string = 'sv';
  private supportedLanguages: string[] = ['en', 'sv'];

  // Active Section
  private activeSectionSubject = new BehaviorSubject<string>('hero');
  activeSection$ = this.activeSectionSubject.asObservable();

  // Translation/Language Logic
  private languageSubject = new BehaviorSubject<string>('en');
  language$ = this.languageSubject.asObservable();

  constructor(private translate: TranslateService,
              private cookieService: CookieService,
              private http: HttpClient) {}

  setActiveSection(section: string) {
    this.activeSectionSubject.next(section);
  }

  initializeLanguage() {
    let savedLang = this.cookieService.get('language');
    if (!savedLang && !this.supportedLanguages.includes(savedLang)) {
      savedLang = this.defaultLanguage;
    }
    this.switchLanguage(savedLang);
  }

  switchLanguage(lang: string): void {
      this.languageSubject.next(lang);
      this.cookieService.set(this.cookieName, lang, { expires: 365, path: '/' });
      this.translate.use(lang);
  }

  getSupportedLanguages(): string[] {
    return this.supportedLanguages;
  }

  getLinks(): Observable<any> {
    return this.http.get('/assets/links.json');
  }




}
