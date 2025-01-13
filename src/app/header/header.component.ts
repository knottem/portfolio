import { Component } from '@angular/core';
import {SectionService} from '../section.service';
import {TranslationService} from '../translation.service';
import {TranslatePipe} from '@ngx-translate/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    TranslatePipe,
    NgClass
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  activeSection: string = 'hero';
  menuOpen: boolean = false;

  constructor(private sectionService: SectionService, private translationService: TranslationService) {}

  ngOnInit() {
    this.sectionService.activeSection$.subscribe((section) => {
      this.activeSection = section;
    });
  }

  toggleLanguage(): void {
    const currentLang = this.translationService.getCurrentLanguage();
    const newLang = currentLang === 'en' ? 'sv' : 'en';
    this.translationService.switchLanguage(newLang);
  }

  getCurrentLanguage(): string {
    return this.translationService.getCurrentLanguage();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
