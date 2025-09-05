import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: "AIzaSyCFfCZR1xxBbKmei092kLY66Th4D8Wf9ng",
        authDomain: "veterinariahn-307b3.firebaseapp.com",
        projectId: "veterinariahn-307b3",
        storageBucket: "veterinariahn-307b3.firebasestorage.app",
        messagingSenderId: "895635522707",
        appId: "1:895635522707:web:064d078ff3f4e7daf43966",
        measurementId: "G-8MK0WE4VHH",
      })
    ),
    provideFirestore(() => getFirestore()),
         provideAuth(() => getAuth()),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ]
};
