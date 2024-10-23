import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private keycloakService: KeycloakService) {}

  login() {
    this.keycloakService.login();
  }

  register() {
    this.keycloakService.register();
  }
}
