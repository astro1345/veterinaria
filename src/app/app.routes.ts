import { Routes } from '@angular/router';
import { Perfilmascota } from './paginas/perfilmascota/perfilmascota';

export const routes: Routes = [

  { path: 'perfilmascota/:id', component: Perfilmascota }, 

{
    path: '',
    loadComponent: () => import('./paginas/login/login').then(m => m.Login)
},
{
    path: 'inicio',
    loadComponent: () => import('./paginas/inicio/inicio').then(m => m.Inicio)
},
{
    path: 'registro',
    loadComponent: () => import('./paginas/registro/registro').then(m => m.Registro)
},

{
    path: 'perfilmascota',
    loadComponent: () => import('./paginas/perfilmascota/perfilmascota').then(m => m.Perfilmascota)
  },
  {
    path: 'miperfil',
    loadComponent: () => import('./paginas/miperfil/miperfil').then(m => m.Miperfil)
  },
    {
    path: 'pacientes',
    loadComponent: () => import('./paginas/pacientes/pacientes').then(m => m.Pacientes)
  }



];
