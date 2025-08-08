import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateResourceRequest, Resource, UpdateResourceRequest } from '../interfaces/resource.interface';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
private API_URL = 'http://127.0.0.1:8000/api/resources';

  constructor(private http: HttpClient) {}

  // Crear recurso
  createResource(data: CreateResourceRequest): Observable<Resource> {
    return this.http.post<Resource>(`${this.API_URL}/`, data);
  }

  // Obtener recursos del usuario actual
  getMyResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.API_URL}/me`);
  }

  // Obtener por formato
  getResourcesByFormat(format: string): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.API_URL}/type/${format}`);
  }

  // Obtener por rango de fechas
  getResourcesByDate(start: string, end: string): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.API_URL}/date/${start}/${end}`);
  }

  // Obtener uno por ID
  getResourceById(id: string): Observable<Resource> {
    return this.http.get<Resource>(`${this.API_URL}/${id}`);
  }

  // Actualizar recurso
  updateResource(id: string, data: UpdateResourceRequest): Observable<Resource> {
    return this.http.patch<Resource>(`${this.API_URL}/${id}`, data);
  }

  // Eliminar recurso
  deleteResource(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.API_URL}/${id}`);
  }
}
