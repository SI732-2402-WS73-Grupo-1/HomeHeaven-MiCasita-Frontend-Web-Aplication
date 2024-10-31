import { Component } from '@angular/core';
import {Router, NavigationEnd, RouterOutlet, RouterLink} from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { AuthService } from './register/services/authentication/authentication.service';
import { MatToolbar } from '@angular/material/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import { NgIf } from '@angular/common';
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatIcon} from "@angular/material/icon";
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    MatToolbar,
    RouterOutlet,
    MatButton,
    NgIf,
    RouterLink,
    MatMenu,
    MatIcon,
    MatMenuTrigger,
    MatIconButton,
    MatMenuItem,
    MatDialogModule
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;
  showButtons = false;
  title: string = 'daos-ws53-micasita';

  constructor(private authService: AuthService, private router: Router) {
    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        tap(() => this.checkAuthenticationStatus())
    ).subscribe();
  }

  checkAuthenticationStatus() {
    this.authService.auth$.subscribe(authenticated => {
      this.isLoggedIn = authenticated;
      const currentUrl = this.router.url;
      const is404 = currentUrl === '/path-to-your-404' || currentUrl === '/register';

      // showButtons será verdadero si el usuario está autenticado y no está en la página 404
      this.showButtons = authenticated && !is404;
    });
  }
  navigateToEstates() {
    this.router.navigate(['/estates']);
  }
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/register']);
  }
}
