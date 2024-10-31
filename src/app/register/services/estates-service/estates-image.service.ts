import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, retry } from 'rxjs';
import { BaseService } from '../../../shared/services/base.service';
import { EstateImg } from '../../model/estate-img-entity/estate-img.entity';

@Injectable({
  providedIn: 'root'
})
export class EstatesImageService extends BaseService<EstateImg> {
  private baseUrl = 'http://localhost:3000';
  private readonly API_URL = `${this.baseUrl}/api/v1/propertyImages`; // replace with your Spring Boot app URL

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/api/v1/estates'; // replace with your Spring Boot app endpoint
  }

  getAllPropertyImages(): Observable<string[]> {
    return this.http.get<string[]>(this.API_URL)
        .pipe(
            retry(2),
            catchError(this.handleError)
        );
  }

  getEstateImagebyPropertyId(propertyId: number): Observable<EstateImg> {
    return this.http.get<EstateImg>(`${this.API_URL}/${propertyId}`);
  }

  createEstateImage(estateImg: EstateImg): Observable<EstateImg> {
    return this.http.post<EstateImg>(`${this.baseUrl}${this.resourceEndpoint}`, estateImg);
  }

  getAll(): Observable<EstateImg[]> {
    return this.http.get<EstateImg[]>(this.resourcePath(), this.httpOptions)
        .pipe(
            retry(2),
            catchError(this.handleError)
        );
  }
}