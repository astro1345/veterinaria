import { inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Session } from './session';
import { arrayUnion, doc, getDoc, updateDoc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class Users {
private firestore = inject(Firestore);
  sesionService = inject(Session);

  async getUserporid(uid: string): Promise<any> {
    const userDoc = doc(this.firestore, 'users', uid);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
      return { uid: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('Users no encontrado');
    }
  }
 gettipoUsuario(uid: string): Promise<any> {

    return this.getUserporid(uid).then(user => user.tipo);
 }
 
 getPacientes(uid: string): Promise<any> {

    return this.getUserporid(uid).then(user => user.pacientes);
 }

  updateUser(user: any) {
  if (!user.uid) {
    return Promise.reject('No se proporcionó idUser');
  }
  
  const userDoc = doc(this.firestore, 'users', user.uid);
  const { uid, ...datosActualizar } = user;
  return updateDoc(userDoc, datosActualizar);
}
async addPaciente(uid: string, pacienteId: string) {
    const userDoc = doc(this.firestore, 'users', uid);
    return updateDoc(userDoc, {
      pacientes: arrayUnion(pacienteId)  // añade el ID si no existe
    });

}

async addVet(idmascota: string, idvet: string) {
    const userDoc = doc(this.firestore, 'mascotas', idmascota);
    return updateDoc(userDoc, {
      veterinarios: arrayUnion(idvet)  // añade el ID si no existe
    });

}
}