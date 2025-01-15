import { ScrollInViewDirective } from './scroll-in-view.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('ScrollInViewDirective', () => {
  let directive: ScrollInViewDirective;
  let mockElementRef: ElementRef;
  let mockRenderer: Renderer2;

  beforeEach(() => {
    // Mock dependencies
    mockElementRef = { nativeElement: {} } as ElementRef;
    mockRenderer = jasmine.createSpyObj('Renderer2', ['addClass']);

    // Create the directive instance
    directive = new ScrollInViewDirective(mockElementRef, mockRenderer);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
