import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse ,HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private api = 'http://localhost:3000/vehicles';

  constructor(private http: HttpClient) {}

  

  getVehicles(): Observable<any[]> {
    return this.http.get<any[]>(this.api).pipe(
      catchError(this.handleError<any[]>('getVehicles', []))
    );
  }

  addVehicle(vehicle: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.api, vehicle, { headers }).pipe(
      catchError(this.handleError<any>('addVehicle'))
    );
  }

  updateVehicle(id: string, vehicle: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.api}/${id}`, vehicle, { headers }).pipe(
      catchError(this.handleError<any>('updateVehicle'))
    );
  }

  deleteVehicle(id: string): Observable<any> {
    return this.http.delete<any>(`${this.api}/${id}`).pipe(
      catchError(this.handleError<any>('deleteVehicle'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(error);
    };
  }
}
