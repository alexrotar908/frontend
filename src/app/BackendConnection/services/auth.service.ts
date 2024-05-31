import { Injectable, WritableSignal, signal } from '@angular/core';
import {jwtDecode} from 'jwt-decode'; // Importa jwtDecode como un módulo completo

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private _token = signal<string | undefined>(undefined);

 constructor(){
  const token = localStorage.getItem('token');
  if (token) {
    this._token.set(token);
  }
 }

 set token(_token: string | undefined) {
    this._token.set(_token);
    if (_token) {
      localStorage.setItem('token', _token);
    } else {
      localStorage.removeItem('token');
    }
  }

 get token(): WritableSignal<string | undefined> {
    return this._token;
 }

 hasValidToken(): boolean {
    const token = this._token();

    if (!token) return false;

    const decodedToken = jwtDecode(token);
    const now = Date.now() / 1000;
   // console.log(decodedToken);

    if (!decodedToken.exp) return false;
    return decodedToken.exp > now;
 }
/*
 getFirstNameFromToken(): string | null {
  const token = this._token();
  if (token) {
    const decodedToken: any = jwtDecode(token);
    return decodedToken.firstName || null;  // Suponiendo que el nombre de usuario está en el campo 'username'
  }
  return null;
}*/
}
