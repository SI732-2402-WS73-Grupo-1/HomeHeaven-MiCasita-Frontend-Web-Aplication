// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {RegisterService} from "../register-service/register.service";
import {User} from "../../model/user-entity/user.entity";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authSubject = new BehaviorSubject<boolean>(false); // Estado de autenticación
  public auth$ = this.authSubject.asObservable();

  constructor(private registerService: RegisterService) {
    this.registerService.auth$.subscribe((isAuthenticated: any) => {
      this.authSubject.next(isAuthenticated);
    });
  }

  login(user: User) {
    this.registerService.login(user).subscribe((existingUser: any) => {
      if (existingUser) {
        this.authSubject.next(true);
      }
    });
  }

  logout() {
    this.authSubject.next(false);
  }
}
