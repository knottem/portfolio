import {Component, HostListener} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {HomeComponent} from './hero/home.component';
import {AboutComponent} from './about/about.component';
import {ProjectsComponent} from './projects/projects.component';
import {ContactComponent} from './contact/contact.component';
import {SharedService} from './shared.service';
import {ExperienceComponent} from './experience/experience.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, HomeComponent, AboutComponent, ProjectsComponent, ContactComponent, ExperienceComponent],
  template: `
    <app-header></app-header>
    <app-home id="home"></app-home>
    <app-about id="about"></app-about>
    <app-experience id="experience"></app-experience>
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

}
