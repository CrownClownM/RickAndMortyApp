import { Component, OnInit } from '@angular/core';

/**
*Componente principal de la autenticacion de usuario, de este se desprenden los componentes de login y registro
*/

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: [ '../auth.css']
})

export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
