import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  updateDoc,
  Firestore,
  getDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class Mascotas {
  private firestore = inject(Firestore);

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
  const mascotaCollection = collection(this.firestore, 'mascotas');
  return collectionData(mascotaCollection, { idField: 'idmascota' });
}

  addMascota(mascota: any) {
  const mascotaCollection = collection(this.firestore, 'mascotas');
  // Primero agregamos el documento
  return addDoc(mascotaCollection, mascota).then((docRef) => {
    // Luego actualizamos el mismo documento para agregar el idmascota
    return updateDoc(docRef, {
      idmascota: docRef.id
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
  // Creamos un objeto sin idmascota para la actualización
  const { idmascota, ...datosActualizar } = mascota;
  return updateDoc(mascotaDoc, datosActualizar);
}

  deleteMascota(mascotaId: string) {
    const mascotaCollection = collection(this.firestore, 'mascotas');
    const mascotaDoc = doc(mascotaCollection, mascotaId);
    return deleteDoc(mascotaDoc);
  }
}