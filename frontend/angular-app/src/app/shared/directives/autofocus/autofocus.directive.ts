import {AfterViewInit, Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {
  constructor(private readonly _elementRef: ElementRef) {}

  ngAfterViewInit() {
    console.log('afi af')
    this._elementRef.nativeElement.focus();
  }
}
