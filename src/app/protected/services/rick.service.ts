import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Personajes, Result } from '../interfaces/personajes.interface';

/**
 * Definicion del servicio para obtener la informacion de la API Rick and Morty
*/

@Injectable({
  providedIn: 'root'
})
export class RickService {

  private Url:string = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los personajes registrados en la API
  */

  getPersonajes(): Observable<Personajes>{
    return this.http.get<Personajes>(this.Url);
  }

  /**
   * Obtiene el numero de paginas de personajes asociadas a la peticion
  */

  getPersonajesPagina(numero: number): Observable<Personajes>{

    const url = `${this.Url}?page=${numero}`
    return this.http.get<Personajes>(url);
  }

  /**
   * Obtiene los personajes que coincidan con el termino de la busqueda
  */

  getPersonajeBuscar(termino : String): Observable<Personajes>{
    const url = `${this.Url}/?name=${termino}`
    return this.http.get<Personajes>(url);
  }

  /**
   * Obtiene la informacion de un personaje en concreto
  */

  getPersonajeId(id : String): Observable<Result>{
    const url = `${this.Url}/${id}`
    return this.http.get<Result>(url);
  }

}
