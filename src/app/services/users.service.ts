import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 api="http://localhost:3000/users";



  constructor(private http: HttpClient) { }

 

  addUser(user: any): Observable<any> {
    let users = this.getUsersFromStorage(); // Retrieve existing users from local storage or API
    users.push(user); // Add new user to the array
    return this.http.post<any>(this.api, users)
      .pipe(
        catchError(this.handleError<any>('addUser'))
      );
  }



  checkEmailExists(email: string): Observable<any> {
    const test1 = this.http.get<any[]>(`${this.api}?email=${email}`);
    const test = fetch(`${this.api}?email=${email}`).then((response)=> response);

    console.log("this is fetch",test.then((response)=> {return response}))
    return test1
  }

  getUserByEmail(email: string): Observable<any> {
    console.log("verifier :",email)
    const existEmail = this.http.get<any[]>(`${this.api}?email=${email}`)
    console.log(existEmail);
    
  return existEmail
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

 

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.api).pipe(
      catchError(this.handleError('getUsers', []))
    );
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`).pipe(
      catchError(this.handleError<any>(`getUserById id=${id}`))
    );
  }

  updateUser(id: number, userData: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, userData).pipe(
      catchError(this.handleError<any>('updateUser'))
    );
  }

 

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.api}/${id}`).pipe(
      catchError(this.handleError<any>('deleteUser'))
    );
  }
  
}