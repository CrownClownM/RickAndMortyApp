import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { LoginResponse, RegisterResponse, Session } from '../interfaces/auth.interface';

/**
 * Definicion del servicio para obtener la informacion del backend
 */

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _session!: Session;

  get session() {
    return { ...this._session };
  }

  constructor( private http: HttpClient ) { }

  /**
   * Realiza el registro con la informacion de los campos del formulario
  */

  registro( username: string, email: string, password: string ) {

    const url  = `${ this.baseUrl }/Create`;
    const id = username;
    const body = { username, email, password, id };
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer NDU3OGZkNTctODU3Ny00NDU5LTk0NTMtOTFlOTVmNmExZGQ3');

    return this.http.post<RegisterResponse>( url, body, {'headers':headers}  )
      .pipe(
        tap( ({ account }) => {
          if ( account.verified! == false ) {
            console.log(account);
          }
        }),
        map( resp => resp ),
        catchError( err => of(err.error.detail) )
      );

  }

  /**
   * Realiza el login con la informacion de los campos del formulario
  */

  login( email: string, password: string ) {

    const url  = `${ this.baseUrl }/Login`;
    const body = { email, password };
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer NDU3OGZkNTctODU3Ny00NDU5LTk0NTMtOTFlOTVmNmExZGQ3');

    return this.http.post<LoginResponse>( url, body, {'headers':headers} )
      .pipe(
        tap( resp => {
          if ( resp.session ) {
            localStorage.setItem('token', resp.session.id! );
          }
        }),
        map( resp => resp ),
        catchError( err => of(err.error.detail) )
      );
  }
  

  /**
   * Realiza la validacion del token en el localstorage
  */

  validarToken(): Observable<boolean> {

    const url = `${ this.baseUrl }/ReadSession`;
    const sessionId = localStorage.getItem('token')
    const body = { sessionId };
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer NDU3OGZkNTctODU3Ny00NDU5LTk0NTMtOTFlOTVmNmExZGQ3');

    return this.http.post<LoginResponse>( url, body, { headers } )
        .pipe(
          map( resp => {
            localStorage.setItem('token', resp.session.id! );
            this._session = {
              id:      resp.session.id!,
              userId:  resp.session.userId!,
              created: resp.session.created!,
              expires: resp.session.expires! 
            }
            return true;
          }),
          catchError( err => of(false) )
        );

  }

  /**
   * Realiza el cierre de sesion del usuario
  */

  logout() {
    const url  = `${ this.baseUrl }/Logout`;
    const sessionId = localStorage.getItem('token');
    const body = { sessionId };
    localStorage.clear();
    return this.http.post(url, body);
  }

}