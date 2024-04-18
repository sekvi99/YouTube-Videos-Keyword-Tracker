import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[truncateText]',
  exportAs: 'truncateText',
})
export class TruncateTextDirective implements AfterViewInit {
  private readonly containerMaxHeight = 450;

  constructor(private elementRef: ElementRef) {}

  @HostListener('window:resize')
  onResize() {
    this.truncateText();
  }

  ngAfterViewInit(): void {
    this.truncateText();
  }

  truncateText(): void {
    const container = this.elementRef.nativeElement;
    const subtitles = container.querySelector('p');
    const maxHeight = container.offsetHeight;

    while (subtitles.offsetHeight > this.containerMaxHeight) {
      const words = subtitles.textContent.split(' ');
      words.pop(); // Remove the last word
      subtitles.textContent = words.join(' ') + '...';
    }
  }
}
