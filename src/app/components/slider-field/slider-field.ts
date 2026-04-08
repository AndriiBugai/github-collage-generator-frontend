import {Component, input, model} from '@angular/core';
import {FormValueControl} from '@angular/forms/signals';
import {MatSliderModule} from '@angular/material/slider';

@Component({
  selector: 'app-slider-field',
  templateUrl: './slider-field.html',
  styleUrl: './slider-field.scss',
  imports: [MatSliderModule],
})
export class SliderField implements FormValueControl<number> {
  readonly value = model<number>(0);

  label = input.required<string>();
  minVal = input.required<number>();
  maxVal = input.required<number>();

  private static nextId = 0;
  protected readonly labelId = `slider-label-${SliderField.nextId++}`;

}
