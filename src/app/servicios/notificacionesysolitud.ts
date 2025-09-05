import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  updateDoc,
  Firestore,
  getDoc, query, where 
} from '@angular/fire/firestore';
import { Session } from './session';
@Injectable({
  providedIn: 'root'
})
export class Notificacionesysolitud {
  

  firestore = inject(Firestore);


  getNotificaciones(idUsuario: string) {
    const notificacionesCollection = collection(this.firestore, `users/${idUsuario}/notificaciones`);
    return collectionData(notificacionesCollection, { idField: 'id' });
  }

  addNotificacion(idUsuario: string, notificacion: any) {
    const notificacionesCollection = collection(this.firestore, `users/${idUsuario}/notificaciones`);
    return addDoc(notificacionesCollection, notificacion);

  }

  deleteNotificacion(notificacionId: string, idUsuario: string) {
    const notificacionDoc = doc(this.firestore, `users/${idUsuario}/notificaciones/${notificacionId}`);
    return deleteDoc(notificacionDoc);
  }
}
