import { Component, OnInit } from '@angular/core';
import { RickService } from '../../services/rick.service';
import { Personajes } from '../../interfaces/personajes.interface';

import Swal from 'sweetalert2';

/**
*Componente que muestra la barra de busqueda y el catalogo con los personajes predeterminados
*/

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['../../catalogo.css']
})

export class CatalogoComponent implements OnInit {

  termino: string = '';
  hayError: boolean = false;
  respuesta !: Personajes;

  constructor(private rickService: RickService) { }

  /**
   * Obtiene la informacion predeterminada a mostrar en pantalla
   */
  ngOnInit(): void {
    this.rickService.getPersonajes()
      .subscribe(personajes => this.respuesta = personajes);
  }

  /**
   * Realiza la busqueda con el termino ingresado en el campo de busqueda
   */
  buscar(){
    this.rickService.getPersonajeBuscar(this.termino)
    .subscribe( personajes => {
      this.hayError = false;
      this.respuesta = personajes;
    }, (err) => {
      this.hayError = true;
      Swal.fire('No se encuentra ese personaje', err, 'warning');
    })
  }

  /**
   * Obtiene la cantidad de casillas para la creacion de la barra de paginacion
   */
  pagina(numero:number){
    this.rickService.getPersonajesPagina(numero)
    .subscribe( personajes => {
      console.log(personajes);
      this.respuesta.results = personajes.results;
    })
  }

}
