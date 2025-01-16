import {Component, HostListener} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {HeroComponent} from './hero/hero.component';
import {AboutComponent} from './about/about.component';
import {ProjectsComponent} from './projects/projects.component';
import {ContactComponent} from './contact/contact.component';
import {SharedService} from './shared.service';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, HeroComponent, AboutComponent, ProjectsComponent, ContactComponent],
  template: `
    <app-header></app-header>
    <app-hero id="hero"></app-hero>
    <app-about id="about"></app-about>
    <app-projects id="projects"></app-projects>
    <app-contact id="contact"></app-contact>
    <app-footer></app-footer>
  `,
  styles: []
})
export class AppComponent {

  title = "portfolio";

  constructor(private sharedService: SharedService) {
    this.sharedService.initializeLanguage();
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
      this.sharedService.setActiveSection(activeSection);
    }
  }
}
