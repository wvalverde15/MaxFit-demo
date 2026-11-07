import { Injectable } from '@angular/core';

export type DemoRole = 'PROPIETARIO' | 'ADMI' | 'OPERADOR' | 'ASESOR' | 'USUARIO';
export interface DemoCredential { email: string; password: string; name: string; role: DemoRole; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly credentials: DemoCredential[] = [
    { email: 'propietario@maxfit.test', password: 'Owner123', name: 'Jürgen Max Fit', role: 'PROPIETARIO' },
    { email: 'admin@maxfit.test', password: 'Admin123', name: 'Andrea Montalvo', role: 'ADMI' },
    { email: 'operador@maxfit.test', password: 'Operador123', name: 'Carlos Ríos', role: 'OPERADOR' },
    { email: 'asesor@maxfit.test', password: 'Asesor123', name: 'María Torres', role: 'ASESOR' },
    { email: 'usuario@maxfit.test', password: 'Usuario123', name: 'Jorge Medina', role: 'USUARIO' }
  ];
  authenticate(email: string, password: string) { return this.credentials.find(item => item.email === email && item.password === password) ?? null; }
}
