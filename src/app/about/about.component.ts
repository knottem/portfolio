import { Component } from '@angular/core';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {NgForOf} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {ScrollInViewDirective} from '../shared/scroll-in-view.directive';

@Component({
  selector: 'app-about',
  imports: [
    TranslatePipe,
    NgForOf,
    ScrollInViewDirective
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  descriptionParts: string[] = [];
  skills: string[] = [];
  keys: string[] = [
    'about.description_parts.part1',
    'about.description_parts.part2',
    'about.description_parts.part3',
    'about.description_parts.part4',
  ];

  constructor(private http: HttpClient, private translate: TranslateService) {}

  ngOnInit() {
    this.loadDescriptions();
    this.translate.onLangChange.subscribe(() => this.loadDescriptions());

    this.http.get<{ skills: string[] }>('/assets/skills.json').subscribe((data) => {
      this.skills = data.skills;
    });
  }

  private loadDescriptions(): void {
    this.descriptionParts = this.keys.map((key) => this.translate.instant(key));
  }

}
