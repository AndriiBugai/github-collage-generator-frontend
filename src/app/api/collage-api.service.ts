import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CollageRequestModel} from './models/collage-request.model';

@Injectable({
  providedIn: 'root',
})
export class CollageApiService {

  private http = inject(HttpClient);

  public generateCollage(collageRequest: CollageRequestModel): Observable<Blob> {
    return this.http.get('/api/collage', {
      params: {...collageRequest},
      responseType: 'blob' as const,
    });
  }
}
