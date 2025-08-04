import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-login',
  imports: [RouterLink, RouterOutlet, Footer],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

}
