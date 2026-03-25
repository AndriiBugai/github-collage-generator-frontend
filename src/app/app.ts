import {Component, inject, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {RouterOutlet} from '@angular/router';
import {CollageForm} from './components/collage-form/collage-form';
import {CollageFormModel} from './components/collage-form/collage-form-model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CollageForm],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);

  loading = signal(false);
  imageUrl = signal<SafeUrl | null>(null);
  error = signal<string | null>(null);

  generate(model: CollageFormModel) {
    this.loading.set(true);
    this.error.set(null);
    this.imageUrl.set(null);

    const {username, collageSize, tileSize} = model;

    console.log('generate', model)

    this.http
      .get('http://localhost:8080/collage', {
        params: {login: username, size: collageSize, tileSize},
        responseType: 'blob',
      })
      .subscribe({
        next: (blob) => {
          this.imageUrl.set(this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob)));
          this.loading.set(false);
        },
        error: () => {
          this.error.set(
            'Failed to generate collage. Make sure the backend is running and the GitHub username is valid.',
          );
          this.loading.set(false);
        },
      });
  }
}
