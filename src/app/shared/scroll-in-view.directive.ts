import {Directive, HostListener} from '@angular/core';
import {SharedService} from '../shared.service';

@Directive({
  selector: '[appScrollInView]'
})
export class ScrollInViewDirective {

  private scrollTimeout: any = null;

  constructor(private sharedService: SharedService) {}

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (this.scrollTimeout) return;

    this.scrollTimeout = setTimeout(() => {
      this.trackActiveSection();
      this.scrollTimeout = null;
    }, 50);
  }

  private trackActiveSection(): void {
    const sections = document.querySelectorAll('section');
    let activeSection: string | null = null;
    let maxVisibleArea = 0;

    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

      // Handles footer section
      if (index === sections.length - 1 && rect.top >= 0 && rect.bottom <= window.innerHeight) {
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
