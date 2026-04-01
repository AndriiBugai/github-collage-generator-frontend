import {Component, computed, input} from '@angular/core';
import {Field, FormField} from '@angular/forms/signals';
import {MatSliderModule} from '@angular/material/slider';

@Component({
  selector: 'app-slider-field',
  templateUrl: './slider-field.html',
  styleUrl: './slider-field.scss',
  imports: [MatSliderModule, FormField],
})
export class SliderField {
  label = input.required<string>();
  min = input.required<number>();
  max = input.required<number>();
  field = input.required<Field<number>>();

  currentValue = computed(() => this.field()().value());

  private static nextId = 0;
  protected readonly labelId = `slider-label-${SliderField.nextId++}`;
}
