import { Routes } from '@angular/router';

export const routes: Routes = [

{
    path: '',
    loadComponent: () => import('./componentes/login/login').then(m => m.Login)
},
{
    path: 'inicio',
    loadComponent: () => import('./componentes/inicio/inicio').then(m => m.Inicio)
},
{
    path: 'registro',
    loadComponent: () => import('./componentes/registro/registro').then(m => m.Registro)
},

{
    path: 'perfilmascota',
    loadComponent: () => import('./componentes/perfilmascota/perfilmascota').then(m => m.Perfilmascota)
  }


];
