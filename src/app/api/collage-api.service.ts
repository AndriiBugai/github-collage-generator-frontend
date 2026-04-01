import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom, map, Observable} from 'rxjs';
import {CollageRequestModel} from './models/collage-request.model';
import {UsernameValidityResponseModel} from './models/username-validity-response.model';

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

  public checkUsernameExists(username: string): Promise<boolean> {
    return firstValueFrom(
      this.http.get<UsernameValidityResponseModel>(
        `/api/users/${encodeURIComponent(username)}/exists`
      ).pipe(map(response => response.exists))
    );
  }
}
