import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from "../../componentes/navbar/navbar";
import { Footer } from '../../componentes/footer/footer';

@Component({
  selector: 'app-miperfil',
  imports: [RouterLink, Navbar, Footer],
  templateUrl: './miperfil.html',
  styleUrl: './miperfil.scss'
})
export class Miperfil {

}
