import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';

@Component({
  selector: 'app-collage-preview',
  templateUrl: './collage-preview.html',
  styleUrl: './collage-preview.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollagePreview {
  tileSize = input.required<number>();
  collageSize = input.required<number>();
  isLoading = input(false);

  cols = computed(() => Math.ceil(Math.sqrt(this.collageSize())));
  rows = computed(() => Math.ceil(this.collageSize() / this.cols()));
  tiles = computed(() => Array.from({length: this.collageSize()}));
}
