import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {
  private apiUrl = 'http://127.0.0.1:8000/vehiculos';

  constructor(
    private http: HttpClient,
    private keycloakService: KeycloakService
  ) { }

  // Obtener la lista de vehículos
  async getVehiculos(): Promise<Observable<any>> {
    const headers = await this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/`, { headers });
  }

  // Obtener un vehículo por ID
  async getVehiculo(id: number): Promise<Observable<any>> {
    const headers = await this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/vehiculo/${id}`, { headers });
  }

  // Crear un nuevo vehículo
  async createVehiculo(vehiculo: any): Promise<Observable<any>> {
    const headers = await this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}/nuevo`, vehiculo, { headers });
  }

  // Actualizar un vehículo
  async updateVehiculo(id: number, vehiculo: any): Promise<Observable<any>> {
    const headers = await this.getHeaders();
    return this.http.put<any>(
      `${this.apiUrl}/actualizar/${id}`,
      vehiculo,
      { headers }
    );
  }

  // Eliminar un vehículo
  async deleteVehiculo(id: number): Promise<Observable<any>> {
    const headers = await this.getHeaders();
    return this.http.delete<any>(`${this.apiUrl}/eliminar/${id}`, { headers });
  }

  // Obtener los encabezados con el token de autenticación
  private async getHeaders(): Promise<HttpHeaders> {
    try {
      const token = await this.keycloakService.getToken();
      return new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
    } catch (error) {
      console.error('Error al obtener el token:', error);

      await this.keycloakService.login();
      throw error;
    }
  }

}
