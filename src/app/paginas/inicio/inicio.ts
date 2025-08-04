import { Component } from '@angular/core';
import { Navbar } from "../../componentes/navbar/navbar";
import { Footer } from "../../componentes/footer/footer";
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [Navbar, Footer,RouterLink, RouterOutlet],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss'
})
export class Inicio {

}
