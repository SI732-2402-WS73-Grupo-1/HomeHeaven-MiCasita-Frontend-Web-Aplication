import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { NgClass, NgIf, NgOptimizedImage } from "@angular/common";
import { User } from "../../model/user-entity/user.entity";
import { RegisterService } from "../../services/register-service/register.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isRegisterMode: boolean = true;
  user: User = new User();

  constructor(private registerService: RegisterService) {}

  onRegister() {
    this.registerService.register(this.user).subscribe(
        response => {
          console.log('User registered successfully');
        },
        error => {
          console.error('Error registering user', error);
        }
    );
  }

  onLogin() {
    this.registerService.login(this.user).subscribe(
        response => {
          console.log('User logged in successfully');
        },
        error => {
          console.error('Error logging in', error);
        }
    );
  }
}