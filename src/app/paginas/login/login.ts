import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Footer } from "../../componentes/footer/footer";
import { Autenticacion } from '../../servicios/autenticacion';
import { ReactiveFormsModule, FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-login',
  imports: [RouterLink, Footer, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  fb = inject(FormBuilder);
  authService = inject(Autenticacion);
  router = inject(Router);

  loginForm = this.fb.group({
    email: [''],
    password: [''],
    remember: [false]
  });

  passwordVisible = false;



  iniciarSesion() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password, remember } = this.loginForm.value;

    this.authService.iniciarSesion(email!, password!)
      .then(credencial => {
        if (credencial.user) {
          const uid = credencial.user.uid;
                  sessionStorage.setItem('uid', uid);
            this.router.navigate(['/inicio']);
        }
      })
      .catch(error => {
        alert('Error al iniciar sesión: ' + error.message);
      });
  }


}