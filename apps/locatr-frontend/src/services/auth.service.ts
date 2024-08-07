import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserRole } from '@profolio/interfaces';
import { lastValueFrom } from 'rxjs';

interface UserLogin {
  username: string;
  password: string;
}

interface ContactInterface {
  name: string;
  phone: string;
  email: string | null;
}

export interface UserRegistration extends UserLogin {
	email: string;
  contact: ContactInterface;
	employee: EmployeeInterface;
}

interface EmployeeInterface {
  firstName: string;
  lastName: string;
  position: string;
  department: string | null;
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private authUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  async register(user: UserRegistration) {
    try {
      await lastValueFrom(this.http.post<any>(`${this.authUrl}/register`, user));
      this.router.navigate(['/auth/login']);
    } catch (error: Error | any) {
      throw new Error('Registration failed: ' + error.message);
    }
  }

  async login(user: UserLogin) {
    try {
      const response = await lastValueFrom(this.http.post<any>(`${this.authUrl}/login`, user));
      sessionStorage.setItem('access_token', response?.access_token);
    } catch (error: Error | any) {
      throw new Error('Login failed: ' + error.message);
    }
  }

  getUserRole(): string {
    return UserRole.ADMIN;
  }

	logout() {
		sessionStorage.removeItem('access_token');
	}

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('access_token');
  }

  getAuthToken(): string | null {
    return sessionStorage.getItem('access_token');
  }
}
