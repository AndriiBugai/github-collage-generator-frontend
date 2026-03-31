import {Component, computed, inject, signal} from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {map} from 'rxjs';
import {CollageApiService} from '../../api/collage-api.service';
import {CollageRequestModel} from '../../api/models/collage-request.model';
import {CollageForm} from '../../components/collage-form/collage-form';
import {CollageFormModel} from '../../components/collage-form/collage-form-model';

@Component({
  selector: 'app-collage-page',
  templateUrl: './collage-page.component.html',
  styleUrl: './collage-page.component.scss',
  imports: [CollageForm],
})
export class CollagePage {
  private collageApiService = inject(CollageApiService);
  private sanitizer = inject(DomSanitizer);

  private collageApiRequest = signal<CollageRequestModel | undefined>(undefined);

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
    return this.collageApiRequest()?.size || 11
  });

  public generateCollage(model: CollageFormModel): void {
    this.collageApiRequest.set({
      login: model.username,
      size: model.collageSize,
      tileSize: model.tileSize,
    });
  }
}
