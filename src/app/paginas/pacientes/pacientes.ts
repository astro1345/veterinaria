import { Component } from '@angular/core';
import { Footer } from '../../componentes/footer/footer';
import { Navbar } from '../../componentes/navbar/navbar';

@Component({
  selector: 'app-pacientes',
  imports: [Footer, Navbar],
  templateUrl: './pacientes.html',
  styleUrl: './pacientes.scss'
})
export class Pacientes {

}
