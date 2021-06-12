import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
})
export class AutofocusDirective implements AfterViewInit {
  constructor(private readonly _elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this._elementRef.nativeElement.focus();
  }
}
