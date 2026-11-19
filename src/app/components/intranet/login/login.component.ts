import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatingInputComponent } from '../../shared/floating-input/floating-input.component';

@Component({ selector: 'app-login', standalone: true, imports: [FormsModule, FloatingInputComponent], templateUrl: './login.component.html',
  styleUrl: './login.component.scss' })
export class LoginComponent { @Output() submit = new EventEmitter<{ email: string; password: string }>(); @Output() forgot = new EventEmitter<void>(); @Output() shop = new EventEmitter<void>(); email = 'propietario@maxfit.test'; password = 'Owner123'; error = ''; fill(email: string, password: string) { this.email = email; this.password = password; } }

