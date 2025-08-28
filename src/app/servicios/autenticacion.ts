import { inject, Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import {
  addDoc,
  collection,
  doc,
  docData,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Autenticacion {
  auth = inject(Auth);
  authState = authState(this.auth);
  loggeado = false;
  firestore = inject(Firestore);

  constructor() {
    this.authState.subscribe(async (user) => {
      console.log('Usuario actual:', user);
      if (user) {
        this.loggeado = true;
      } else {
        this.loggeado = false;
      }
    });
  }

  addUser(user: any, id: string) {
    const userDocRef = doc(this.firestore, `users/${id}`);
    return setDoc(userDocRef, user);
  }

  registrarUsuario(email: string, password: string, nombre: string, tipo: string) {
    return createUserWithEmailAndPassword(this.auth, email, password).then(
      async (credencial) => {
        if (credencial.user && !credencial.user.emailVerified) {
          alert('Por favor verifica tu correo');
          await sendEmailVerification(credencial.user);
        }

        this.addUser(
          { uid: credencial.user.uid,
            email: credencial.user.email,
            nombre: nombre,
            tipo: tipo,
          },
          credencial.user.uid
        );

        return credencial;
      }
    );
  }

  cerrarSesion() {
    return signOut(this.auth);
  }

  iniciarSesion(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password).then(
      async (credencial) => {
        if (credencial.user && !credencial.user.emailVerified) {
          alert('Por favor verifica tu correo');
          await sendEmailVerification(credencial.user);
        }
        return credencial;
      }
    );
  }

 
}
