import {Component, ElementRef, HostListener} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {NgClass, NgForOf} from '@angular/common';
import {SharedService} from '../shared.service';

@Component({
  selector: 'app-header',
  imports: [
    TranslatePipe,
    NgClass,
    NgForOf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  activeSection: string = '';
  currentLanguage: string = '';
  supportedLanguages: { code: string; name: string; flag: string }[] = [];
  menuOpen: boolean = false;

  constructor(private sharedService: SharedService,
              private elementRef: ElementRef) {}

  ngOnInit() {
    this.supportedLanguages = this.sharedService.getSupportedLanguages();

    this.sharedService.language$.subscribe((lang) => {
      this.currentLanguage = lang;
    });

    this.sharedService.activeSection$.subscribe((section) => {
      this.activeSection = section;
    });
  }

  switchLanguage(lang: string): void {
    this.sharedService.switchLanguage(lang);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const targetElement = event.target as HTMLElement;
    if (this.menuOpen && !this.elementRef.nativeElement.contains(targetElement)) {
      this.menuOpen = false;
    }
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }


}
