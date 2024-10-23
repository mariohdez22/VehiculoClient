import { Component, OnInit } from '@angular/core';
import { VehiculosService } from '../vehiculos.service';
import { KeycloakService } from 'keycloak-angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  vehiculos: any[] = [];

  constructor(
    private keycloakService: KeycloakService,
    private vehiculosService: VehiculosService
  ) {}

  ngOnInit(): void {
    this.cargarVehiculos();
  }

  async cargarVehiculos() {
    try {
      const observable = await this.vehiculosService.getVehiculos();
      observable.subscribe(
        (response) => {

          if (response.success) {

            this.vehiculos = response.data;
            console.log('Vehículos recibidos:', this.vehiculos);

          } else {

            console.error('Error en la respuesta:', response.message);

          }
        },
        (error) => {

          console.error('Error al obtener los vehículos:', error);

        }
      );
    } catch (error) {

      console.error('Error al cargar los vehículos:', error);

    }
  }

  logout() {
    this.keycloakService.logout();
  }

}
