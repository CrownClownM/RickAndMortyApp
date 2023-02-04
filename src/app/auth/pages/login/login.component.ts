import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

/**
 * Componente encargado del inicio de sesion de usuarios
 */

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ '../auth.css']
})
export class LoginComponent {

  /** 
   * Definicion del formulario reactivo con parametros predeterminados para mayor facilidad de pruebas al hacer un inicio de sesion
  */
  miFormulario: FormGroup = this.fb.group({
    email:    ['medina@example.com', [ Validators.required, Validators.email ]],
    password: ['Password1', [ Validators.required, Validators.minLength(6) ]],
  });

  /**
   * @param authService: Haciendo llamado al servicio de autenticacion
   */
  constructor( private fb: FormBuilder,
               private router: Router, 
               private authService: AuthService) { }

  /**
   * Funcion que se encarga de tomar los datos del formulario de login y hacer la peticion de inicio de sesion
   */

  login() {
    const { email, password } = this.miFormulario.value;
    this.authService.login( email, password )
      .subscribe( resp => {
        if(resp.session) {
          this.router.navigateByUrl('/home');
        } else {
          Swal.fire('Error', resp, 'error');
        }
    });
  }
}
