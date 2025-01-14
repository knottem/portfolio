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
  activeSection: string = 'hero';
  menuOpen: boolean = false;

  supportedLanguages: string[] = [];
  currentIndex: number = 0;
  currentLanguage: string = 'en';


  constructor(private sharedService: SharedService,
              private elementRef: ElementRef) {}

  ngOnInit() {
    this.supportedLanguages = this.sharedService.getSupportedLanguages();
    this.currentIndex = this.supportedLanguages.indexOf(this.currentLanguage);

    this.sharedService.activeSection$.subscribe((section) => {
      this.activeSection = section;
    });

    this.sharedService.language$.subscribe((lang) => {
      this.currentLanguage = lang;
    });
  }

  toggleLanguage(): void {
    const newLang =
      this.supportedLanguages[(this.supportedLanguages.indexOf(this.currentLanguage) + 1) % this.supportedLanguages.length];
    this.sharedService.switchLanguage(newLang);
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


}
