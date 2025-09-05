import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  updateDoc,
  Firestore,
  getDoc, query, where, 
  docData,
  documentId
} from '@angular/fire/firestore';
import { Session } from './session';
import { of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Mascotas {
  private firestore = inject(Firestore);
  sesionService = inject(Session);
  uidDueño: string | null = this.sesionService.getUid();

  async getMascotaById(id: string): Promise<any> {
    const mascotaDoc = doc(this.firestore, 'mascotas', id);
    const docSnap = await getDoc(mascotaDoc);

    if (docSnap.exists()) {
      return { idmascota: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('Mascota no encontrada');
    }
  }

getMascotas() {
  this.uidDueño = this.sesionService.getUid();
  const mascotaCollection = collection(this.firestore, 'mascotas');
  const q = query(mascotaCollection, where('idduenio', '==',this.uidDueño));
  return collectionData(q, { idField: 'idmascota' });
}

  addMascota(mascota: any) {
  const mascotaCollection = collection(this.firestore, 'mascotas');
  this.uidDueño = this.sesionService.getUid();
  // Primero agregamos el documento
  return addDoc(mascotaCollection, mascota).then((docRef) => {
    
    return updateDoc(docRef, {
      idmascota: docRef.id,
      idduenio: this.uidDueño
    }).then(() => {
      return { idmascota: docRef.id, ...mascota };
    });
  });
}

  updateMascota(mascota: any) {
  if (!mascota.idmascota) {
    return Promise.reject('No se proporcionó idmascota');
  }
  
  const mascotaDoc = doc(this.firestore, 'mascotas', mascota.idmascota);
  const { idmascota, ...datosActualizar } = mascota;
  return updateDoc(mascotaDoc, datosActualizar);
}

  deleteMascota(mascotaId: string) {
    const mascotaCollection = collection(this.firestore, 'mascotas');
    const mascotaDoc = doc(mascotaCollection, mascotaId);
    return deleteDoc(mascotaDoc);
  }
  
 getMascotasPorPacientes(uid: string) {
    const userDoc = doc(this.firestore, `users/${uid}`);

    return docData(userDoc).pipe(
      switchMap((user: any) => {
        const pacientes: string[] = user?.pacientes || [];
        if (pacientes.length === 0) {
          return of([]); // si no tiene pacientes, devuelve array vacío
        }

        // Consulta a mascotas con where(documentId(), 'in', [...])
        const mascotasCollection = collection(this.firestore, 'mascotas');
        const q = query(mascotasCollection, where(documentId(), 'in', pacientes));

        return collectionData(q, { idField: 'idmascota' });
      })
    );
  }
}