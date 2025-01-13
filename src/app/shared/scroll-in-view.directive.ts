import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appScrollInView]'
})
export class ScrollInViewDirective {
  private isAnimated = false; // Ensure the animation happens only once

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Check if the section is entering the viewport
    if (rect.top < windowHeight * 0.8 && !this.isAnimated) {
      this.isAnimated = true; // Mark as animated to prevent re-triggering
      this.renderer.addClass(this.el.nativeElement, 'in-view');
    }
  }
}
