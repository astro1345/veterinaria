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
    const personaCollection = collection(this.firestore, 'mascotas');
    return addDoc(personaCollection, mascota);
  }

  updateMascota(mascota: any) {
    const mascotaCollection = collection(this.firestore, 'mascotas');

    const mascotaDoc = doc(mascotaCollection, mascota.idmascota);
    return updateDoc(mascotaDoc, mascota);
  }

  deleteMascota(mascotaId: string) {
    const mascotaCollection = collection(this.firestore, 'mascotas');
    const mascotaDoc = doc(mascotaCollection, mascotaId);
    return deleteDoc(mascotaDoc);
  }
}