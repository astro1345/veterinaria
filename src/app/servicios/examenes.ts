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
export class Examenes {
    firestore = inject(Firestore);
  
  
    getExamenes(idMascota: string) {
      const examenesCollection = collection(this.firestore, `mascotas/${idMascota}/examenes`);
      return collectionData(examenesCollection, { idField: 'id' });
    }
  
    addExamen(idMascota: string, examen: any) {
      const examenesCollection = collection(this.firestore, `mascotas/${idMascota}/examenes`);
      return addDoc(examenesCollection, examen);
  
    }


    updateExamen(idMascota: string, examen: any) {
      const examenDoc = doc(this.firestore, `mascotas/${idMascota}/examenes/${examen.id}`);
      return updateDoc(examenDoc, examen);
    }


    deleteExamen(idMascota: string, examenId: string) {
      const examenDoc = doc(this.firestore, `mascotas/${idMascota}/examenes/${examenId}`);
      return deleteDoc(examenDoc);
    }


  
}
