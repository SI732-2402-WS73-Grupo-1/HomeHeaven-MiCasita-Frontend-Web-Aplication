import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, retry } from 'rxjs';
import { Estate } from "../../model/estate-entity/estate.entity";
import { Reservation } from "../../model/reservation-entity/reservation.entity";
import { BaseService } from "../../../shared/services/base.service";

@Injectable({
  providedIn: 'root'
})
export class EstatesService extends BaseService<Estate> {
  private baseUrl = 'http://localhost:3000'; // replace with your Spring Boot app URL

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/api/v1/estates'; // replace with your Spring Boot app endpoint
  }

  getEstates(): Observable<any> {
    return this.http.get(`${this.baseUrl}${this.resourceEndpoint}`);
  }

  getEstateById(id: number): Observable<Estate> {
    return this.http.get<Estate>(`${this.baseUrl}${this.resourceEndpoint}/${id}`);
  }

  createEstate(estate: Estate): Observable<Estate> {
    return this.http.post<Estate>(`${this.baseUrl}${this.resourceEndpoint}`, estate);
  }

  getAll(): Observable<Estate[]> {
    return this.http.get<Estate[]>(this.resourcePath(), this.httpOptions)
        .pipe(retry(2), catchError(this.handleError));
  }

  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.baseUrl}/api/v1/reservations`, reservation);
  }
}
