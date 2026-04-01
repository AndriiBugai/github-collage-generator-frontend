import {ChangeDetectionStrategy, Component, inject, input, output, resource, signal} from '@angular/core';
import {takeUntilDestroyed, toObservable} from '@angular/core/rxjs-interop';
import {
  form,
  FormField,
  required,
  min,
  max,
  debounce,
  validateAsync,
  TreeValidationResult
} from '@angular/forms/signals';
import {CollageFormLimitsModel, CollageFormModel} from './collage-form-model';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {SliderField} from '../slider-field/slider-field';
import {CollageConstants} from '../../constants/collage-constants';
import {FormsModule} from '@angular/forms';
import {debounceTime, skip} from 'rxjs';
import {CollageApiService} from '../../api/collage-api.service';

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
    SliderField,
    FormsModule,
  ],
})
export class CollageForm {
  isLoading = input(false);
  formSubmit = output<CollageFormModel>();
  formChange = output<CollageFormModel>();

  private collageApiService = inject(CollageApiService);

  private model = signal<CollageFormModel>({
    username: 'octocat', // random GitHub username for a quick demo to make form valid for quick form submit
    collageSize: CollageConstants.COLLAGE_SIZE,
    tileSize: CollageConstants.TILE_SIZE,
  });

  public readonly limits: CollageFormLimitsModel = {
    collageSize: {min: 4, max: 100},
    tileSize: {min: 25, max: 100},
  };

  private readonly debounceTime = 400;

  public collageForm = form(this.model, (f) => {
    required(f.username, {message: 'This field is required'});
    debounce(f.username, this.debounceTime);
    validateAsync(f.username, {
      params: (ctx) => ctx.value(),
      factory: (params) => resource({
        params: () => params(),
        loader: ({params: username}) => this.collageApiService.checkUsernameExists(username),
      }),
      onSuccess: (exists: boolean): TreeValidationResult => {
        return exists ? undefined : {kind: 'not found', message: 'GitHub user not found'}
      },
      onError: (): TreeValidationResult => ({kind: 'failed', message: 'Validation failed'}),
    });
    required(f.collageSize, {message: 'This field is required'});
    min(f.collageSize, this.limits.collageSize.min, {message: `Min value is ${this.limits.collageSize.min}`});
    max(f.collageSize, this.limits.collageSize.max, {message: `Max value is ${this.limits.collageSize.max}`});
    min(f.tileSize, this.limits.tileSize.min, {message: `Min value is ${this.limits.tileSize.min}`});
    max(f.tileSize, this.limits.tileSize.max, {message: `Max value is ${this.limits.tileSize.max}`});
  });

  constructor() {
    toObservable(this.model).pipe(
      skip(1),
      debounceTime(this.debounceTime),
      takeUntilDestroyed(),
    ).subscribe(model => this.formChange.emit(model));
  }

  public onSubmit() {
    if (this.collageForm().valid()) {
      this.formSubmit.emit(this.collageForm().value());
    } else {
      this.collageForm.username().markAsTouched();
      this.collageForm.collageSize().markAsTouched();
      this.collageForm.tileSize().markAsTouched();
    }
  }
}
