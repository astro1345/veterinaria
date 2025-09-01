import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Session {
  
constructor() {}


   setUid(uid: string) {
    localStorage.setItem('uid', uid);
  }

  getUid(): string | null {
    return localStorage.getItem('uid');
  }

  clearUid() {
    localStorage.removeItem('uid');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('uid');
  }
}