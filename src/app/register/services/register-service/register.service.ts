import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, catchError, map, Observable, tap } from "rxjs";
import { User } from "../../model/user-entity/user.entity";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    private authSubject = new BehaviorSubject<boolean>(false); // Estado de autenticación
    public auth$ = this.authSubject.asObservable();

    constructor(private http: HttpClient, private router: Router) {}

    login(user: User): Observable<any> {
        return this.http.get<User>(`http://localhost:3000/api/v1/users/phone/${user.phone}`)
            .pipe(
                map((existingUser: User) => {
                    if (existingUser && existingUser.phone === user.phone) {
                        return existingUser;
                    } else {
                        throw new Error('Usuario o contraseña incorrectos.');
                    }
                }),
                tap((existingUser: User) => {
                    this.authSubject.next(true); // Marcar como autenticado
                    this.router.navigate(['/estates']);
                }),
                catchError(error => {
                    alert(error.message || 'Error al iniciar sesión.');
                    throw error;
                })
            );
    }

    register(user: User): Observable<any> {
        return this.http.post<User>('http://localhost:3000/api/v1/users', user)
            .pipe(
                tap((newUser: User) => {
                    this.authSubject.next(true); // Marcar como autenticado
                    this.router.navigate(['/estates']);
                }),
                catchError(error => {
                    alert('Error al registrar usuario.');
                    throw error;
                })
            );
    }

    logout() {
        this.authSubject.next(false);
    }
}
