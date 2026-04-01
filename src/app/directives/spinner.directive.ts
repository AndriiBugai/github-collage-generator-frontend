import {Directive, inject, input} from '@angular/core';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Directive({
  selector: 'mat-spinner[appSpinner]',
  host: {
    'role': 'status',
    '[attr.aria-label]': 'label()',
    'style': 'margin: 0 12px',
  },
})
export class SpinnerDirective {
  label = input.required<string>();

  constructor() {
    inject(MatProgressSpinner).diameter = 20;
  }
}
