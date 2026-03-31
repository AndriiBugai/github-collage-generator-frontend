import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
import {Field, FormField} from '@angular/forms/signals';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';

@Component({
  selector: 'app-slider-field',
  templateUrl: './slider-field.html',
  styleUrl: './slider-field.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatFormFieldModule, MatInputModule, MatSliderModule, FormField],
})
export class SliderField {
  label = input.required<string>();
  min = input.required<number>();
  max = input.required<number>();
  field = input.required<Field<number>>();

  currentValue = computed(() => this.field()().value());
}
