import {ChangeDetectionStrategy, Component, input, output, signal} from '@angular/core';
import {form, FormField, required, min, max} from '@angular/forms/signals';
import {CollageFormLimitsModel, CollageFormModel} from './collage-form-model';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {CollageConstants} from '../../constants/collage-constants';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-collage-form',
  templateUrl: './collage-form.html',
  styleUrl: './collage-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FormField,
    FormsModule,
  ],
})
export class CollageForm {
  isLoading = input(false);
  formSubmit = output<CollageFormModel>();

  private model = signal<CollageFormModel>({
    username: 'octocat', // random GitHub username for a quick demo to make form valid for quick form submit
    collageSize: CollageConstants.COLLAGE_SIZE,
    tileSize: CollageConstants.TILE_SIZE,
  });

  public readonly limits: CollageFormLimitsModel = {
    collageSize: {min: 4, max: 100},
    tileSize: {min: 25, max: 100},
  };

  // TODO add a helper for validation messages
  public collageForm = form(this.model, (f) => {
    required(f.username, {message: 'This field is required'});
    required(f.collageSize, {message: 'This field is required'});
    min(f.collageSize, this.limits.collageSize.min, {message: `Min value is ${this.limits.collageSize.min}`});
    max(f.collageSize, this.limits.collageSize.max, {message: `Max value is ${this.limits.collageSize.max}`});
    min(f.tileSize, this.limits.tileSize.min, {message: `Min value is ${this.limits.tileSize.min}`});
    max(f.tileSize, this.limits.tileSize.max, {message: `Max value is ${this.limits.tileSize.max}`});
  });

  public onSubmit() {
    if (this.collageForm().valid()) {
      this.formSubmit.emit(this.collageForm().value());
    }
  }
}
