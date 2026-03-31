import {Component, computed, inject, signal} from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {map} from 'rxjs';
import {CollageApiService} from '../../api/collage-api.service';
import {CollageRequestModel} from '../../api/models/collage-request.model';
import {CollageForm} from '../../components/collage-form/collage-form';
import {CollageFormModel} from '../../components/collage-form/collage-form-model';
import {CollageConstants} from '../../constants/collage-constants';
import {CollagePreview} from '../../components/collage-preview/collage-preview';

@Component({
  selector: 'app-collage-page',
  templateUrl: './collage-page.component.html',
  styleUrl: './collage-page.component.scss',
  imports: [CollageForm, CollagePreview],
})
export class CollagePage {
  private collageApiService = inject(CollageApiService);
  private sanitizer = inject(DomSanitizer);

  private collageApiRequest = signal<CollageRequestModel | undefined>(undefined);

  private latestFormValue = signal<CollageFormModel | undefined>(undefined);

  private collageResource = rxResource<SafeUrl, CollageRequestModel | undefined>({
    params: () => this.collageApiRequest(),
    stream: ({params}) =>
      this.collageApiService.generateCollage(params).pipe(
        map(blob => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob))),
      ),
  });

  public imageUrl = this.collageResource.value;
  public isLoading = this.collageResource.isLoading;
  public isLoadedSuccessfully = computed(() => !this.collageResource.error());

  public collageSize = computed(()  => {
    return this.latestFormValue()?.collageSize || CollageConstants.COLLAGE_SIZE
  });

  public tileSize = computed(()  => {
    return this.latestFormValue()?.tileSize || CollageConstants.TILE_SIZE
  });

  public onFormSubmitted(model: CollageFormModel): void {
    this.collageApiRequest.set({
      login: model.username,
      size: model.collageSize,
      tileSize: model.tileSize,
    });
  }

  public onFormChanged(model: CollageFormModel): void {
    this.latestFormValue.set(model);
    this.imageUrl.set(undefined);
  }
}
