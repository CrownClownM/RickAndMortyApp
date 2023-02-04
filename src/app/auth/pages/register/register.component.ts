import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

/**
 * Componente encargado del registro de usuarios
 */

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ '../auth.css']
})

export class RegisterComponent {

  /** 
   * Definicion del formulario reactivo con parametros predeterminados para mayor facilidad de pruebas al hacer un registro
  */

  miFormulario: FormGroup = this.fb.group({
    username:     ['', [ Validators.required, Validators.minLength(3)]],
    email:    ['', [ Validators.required, Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,3}")]],
    password: ['', [ Validators.required, Validators.pattern(/^([a-zA-Z0-9]){8,}$/)]],
  });

  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AuthService ) { }

  campoValido(campo:string){
    return this.miFormulario.controls[campo]?.errors && this.miFormulario.controls[campo]?.touched;
  }

  registro() {
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }
    let { username, email, password } = this.miFormulario.value;
    username = username.replace(/\s{2,}/g, ' ').trim();
    email = email.replace(/\s{2,}/g, ' ').trim();
    this.authService.registro( username, email, password )
      .subscribe( account => {
        if ( account.verified ) {
          Swal.fire('Error', account, 'error');
        } else {
          this.router.navigateByUrl('/auth');
          Swal.fire('Cuenta creada correctamente', account.verified, 'success');
        }
      });
  }
}
