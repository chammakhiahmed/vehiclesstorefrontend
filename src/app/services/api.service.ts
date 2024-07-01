import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 api="http://localhost:3000";



  constructor(private http: HttpClient) { }

  // Get all vehicles
  getVehicles() { 
    return this.http.get<any[]>(this.api+"/vehicles");
  }


  addUser(user: any): Observable<any> {
    let users = this.getUsersFromStorage(); // Retrieve existing users from local storage or API
    users.push(user); // Add new user to the array
    return this.http.post<any>(this.api+"/users", users)
      .pipe(
        catchError(this.handleError<any>('addUser'))
      );
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.api+"/users"}?email=${email}`).pipe(
      map(users => users.length > 0) // Check if any user with this email exists
    );
  }
 

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private getUsersFromStorage(): any[] {
    let users = localStorage.getItem('users'); // Retrieve from local storage or API
    return users ? JSON.parse(users) : [];
  }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get<any[]>(`${this.api+"/users"}?email=${email}`).pipe(
      map(users => users.length > 0 ? users[0] : null)
    );
  }

}