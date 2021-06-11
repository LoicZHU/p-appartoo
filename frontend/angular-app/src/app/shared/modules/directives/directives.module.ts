import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutofocusDirective } from '../../directives/autofocus/autofocus.directive';

@NgModule({
  declarations: [AutofocusDirective],
  imports: [CommonModule],
  exports: [AutofocusDirective],
})
export class DirectivesModule {}
