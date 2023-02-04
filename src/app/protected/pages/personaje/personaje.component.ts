import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Result } from '../../interfaces/personajes.interface';
import { RickService } from '../../services/rick.service';

/**
 * Modulo de presentacion del personaje seleccionado en el catalogo junto a su informacion
 */

@Component({
  selector: 'app-personaje',
  templateUrl: './personaje.component.html',
  styleUrls: [ '../../catalogo.css']
})

export class PersonajeComponent implements OnInit {

  personaje!: Result | undefined;

  constructor(private activatedRoute: ActivatedRoute, private rickService: RickService) { }

  /**
   * Obtiene la informacion desde el id del personaje seleccionado
  */

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.rickService.getPersonajeId(id)),
      tap(console.log)
    )
    .subscribe(personaje => this.personaje = personaje);
  }

}
