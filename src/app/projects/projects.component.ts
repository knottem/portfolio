import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgForOf, NgIf} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {ScrollInViewDirective} from '../shared/scroll-in-view.directive';

@Component({
  selector: 'app-projects',
  imports: [
    NgForOf,
    NgIf,
    ScrollInViewDirective
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  projects: any[] = [];
  currentLanguage: string = 'en';

  constructor(private http: HttpClient, private translate: TranslateService) {}

  ngOnInit(): void {
    this.http.get<any[]>('/assets/projects.json').subscribe((data) => {
      this.projects = data;
    });

    this.currentLanguage = this.translate.currentLang || 'en';

    this.translate.onLangChange.subscribe((event) => {
      this.currentLanguage = event.lang;
    });
  }

  getProjectTitle(project: any): string {
    return this.currentLanguage === 'sv' ? project.name_sv : project.name;
  }

  getProjectDescription(project: any): string {
    return this.currentLanguage === 'sv' ? project.description_sv : project.description;
  }

}
