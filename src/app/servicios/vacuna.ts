import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  updateDoc
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class VacunaService {
  firestore = inject(Firestore);


  getVacunas(idMascota: string) {
    const vacunasCollection = collection(this.firestore, `mascotas/${idMascota}/vacunas`);
    return collectionData(vacunasCollection, { idField: 'id' });
  }

  addVacuna(idMascota: string, vacuna: any) {
    const vacunasCollection = collection(this.firestore, `mascotas/${idMascota}/vacunas`);
    return addDoc(vacunasCollection, vacuna);

  }


  updateVacuna(idMascota: string, vacuna: any) {
    const vacunaDoc = doc(this.firestore, `mascotas/${idMascota}/vacunas/${vacuna.id}`);
    return updateDoc(vacunaDoc, vacuna);
  }


  deleteVacuna(idMascota: string, vacunaId: string) {
    const vacunaDoc = doc(this.firestore, `mascotas/${idMascota}/vacunas/${vacunaId}`);
    return deleteDoc(vacunaDoc);
  }
}
