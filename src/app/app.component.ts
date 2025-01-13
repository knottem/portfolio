import {Component, HostListener} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {HeroComponent} from './hero/hero.component';
import {AboutComponent} from './about/about.component';
import {ProjectsComponent} from './projects/projects.component';
import {ContactComponent} from './contact/contact.component';
import {SectionService} from './section.service';
import {TranslateService} from '@ngx-translate/core';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, HeroComponent, AboutComponent, ProjectsComponent, ContactComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = "portfolio";

  constructor(private sectionService: SectionService,
              private translate: TranslateService,
              private cookieService: CookieService) {
    this.initializeApp();

  }

  private initializeApp(): void {
    const savedLang = this.cookieService.get('language');
    if (savedLang) {
      this.translate.use(savedLang);
    } else {
      const browserLang = this.translate.getBrowserLang();
      if (browserLang === 'en' || browserLang === 'sv') {
        this.translate.use(browserLang);
        this.cookieService.set('language', browserLang, { expires: 365, path: '/' });
      } else {
        this.translate.setDefaultLang('en');
        this.translate.use('en');
        this.cookieService.set('language', 'en', { expires: 365, path: '/' });
      }
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const sections = document.querySelectorAll('section');
    let activeSection: string | null = null;
    let maxVisibleArea = 0;

    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      if (
        index === sections.length - 1 &&
        rect.top >= 0 &&
        rect.bottom <= window.innerHeight
      ) {
        activeSection = section.id;
        return;
      }

      if (visibleHeight > 0 && visibleHeight > maxVisibleArea) {
        maxVisibleArea = visibleHeight;
        activeSection = section.id;
      }
    });

    if (activeSection) {
      this.sectionService.setActiveSection(activeSection);
    }
  }
}
