import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Session {
  
constructor() {}


  setUid(uid: string) {
    sessionStorage.setItem('uid', uid);
  }

  getUid(): string | null {
    return sessionStorage.getItem('uid');
  }

  clearUid() {
    sessionStorage.removeItem('uid');
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('uid');
  }
}