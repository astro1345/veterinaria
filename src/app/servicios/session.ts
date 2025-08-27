import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Session {
  
constructor() {}

  // Guardar uid en sessionStorage
  setUid(uid: string) {
    sessionStorage.setItem('uid', uid);
  }

  // Obtener uid de sessionStorage
  getUid(): string | null {
    return sessionStorage.getItem('uid');
  }

  // Eliminar uid de sessionStorage (logout)
  clearUid() {
    sessionStorage.removeItem('uid');
  }

  // Opción: método para chequear si hay usuario logueado
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('uid');
  }
}